import json
import requests
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Initialize the FastAPI app
app = FastAPI()

# --- CORS Middleware ---
# Allows your frontend to communicate with this backend
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Request Bodies ---

class UserMessage(BaseModel):
    """
    Model for a user's chat message.
    NOW INCLUDES A LANGUAGE FIELD.
    """
    message: str
    language: str  # e.g., 'en' for English, 'hi' for Hindi

class ReminderRequest(BaseModel):
    """Model for a vaccine reminder request from the form."""
    name: str
    dob: str
    phone: str

# --- NEW: Multilingual Translation Function ---
def translate_text(text: str, source_lang: str, target_lang: str):
    """
    Translates text using the MyMemory API. It's free and requires no key for demo purposes.
    """
    if source_lang == target_lang:
        return text

    api_url = "https://api.mymemory.translated.net/get"
    
    params = {
        'q': text,
        'langpair': f'{source_lang}|{target_lang}'
    }

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()
        data = response.json()
        
        if data['responseStatus'] == 200:
            return data['responseData']['translatedText']
        else:
            print(f"MyMemory API Error: {data.get('responseDetails')}")
            return text  # Fallback to original text on API error
            
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Translation API: {e}")
        return text  # Fallback on connection error

# --- API Endpoints ---

@app.post("/chat")
def chat_with_bot(user_message: UserMessage):
    """
    UPDATED Endpoint to handle multilingual chat messages from the user.
    """
    user_lang = user_message.language
    
    # Step 1: Translate user's message to English for Rasa
    message_for_rasa = translate_text(user_message.message, user_lang, 'en')
    
    # Step 2: Send the English message to the Rasa server
    rasa_url = "http://localhost:5005/webhooks/rest/webhook"
    rasa_payload = {
        "sender": "user",
        "message": message_for_rasa
    }
    
    bot_reply_english = "Sorry, I'm having connection issues right now." # Default error message
    try:
        response = requests.post(rasa_url, json=rasa_payload)
        response.raise_for_status()
        rasa_response = response.json()
        if rasa_response:
            bot_reply_english = rasa_response[0].get("text", "Sorry, I couldn't understand that.")
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Rasa server: {e}")
        
    # Step 3: Translate Rasa's English response back to the user's original language
    final_bot_reply = translate_text(bot_reply_english, 'en', user_lang)
        
    return {"bot_reply": final_bot_reply}


@app.post("/api/reminders")
def create_reminder(reminder: ReminderRequest):
    """
    Endpoint to receive vaccine reminder data from the form.
    """
    print("--- New Vaccine Reminder Request Received ---")
    print(f"  Parent's Name: {reminder.name}")
    print(f"  Child's DOB: {reminder.dob}")
    print(f"  WhatsApp Number: {reminder.phone}")
    print("-------------------------------------------")
    return {"status": "success", "message": "Reminder request received successfully."}


@app.get("/api/alerts")
def get_alerts():
    """
    Endpoint to serve the static outbreak alert data from a JSON file.
    """
    alerts_file_path = "../data/alerts.json"
    try:
        with open(alerts_file_path, "r") as f:
            alerts_data = json.load(f)
        return alerts_data
    except FileNotFoundError:
        return {"error": "Alerts data file not found."}
    except Exception as e:
        return {"error": f"An error occurred while reading alerts data: {str(e)}"}


@app.get("/")
def read_root():
    """
    Root endpoint to check if the server is running.
    """
    return {"status": "Arogya AI backend is running!"}