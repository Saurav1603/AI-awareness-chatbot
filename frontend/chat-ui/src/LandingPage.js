import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

// --- Header Component (No Changes Needed) ---
const Header = () => (
  <header className="bg-gradient-to-r from-teal-600 to-cyan-600 shadow-lg sticky top-0 z-50">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Arogya AI
        </h1>
      </Link>
      <nav className="hidden md:flex items-center space-x-8 text-white font-medium">
        <Link to="/#english" className="hover:text-teal-200 transition">
          English ▾
        </Link>
        <Link to="/vaccines" className="hover:text-teal-200 transition">
          Vaccines
        </Link>
        <Link to="/alerts" className="hover:text-teal-200 transition">
          Alerts
        </Link>
        <Link to="/about" className="hover:text-teal-200 transition">
          About
        </Link>
      </nav>
    </div>
  </header>
);

const LandingPage = () => {
  // --- NEW: Add the useNavigate hook ---
  const navigate = useNavigate();

  // --- NEW: Function to handle language selection ---
  const handleStartChat = (langCode) => {
    // Save the user's chosen language to the browser's local storage
    localStorage.setItem('userLanguage', langCode);
    // Programmatically navigate to the chat page
    navigate('/chat');
  };

  return (
    <div className="font-sans bg-gradient-to-b from-cyan-50 to-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-cyan-100 to-cyan-50">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Smarter Healthcare with <span className="text-teal-600">AI</span>
        </h2>
        <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
          Arogya AI empowers communities with real-time outbreak alerts,
          vaccination reminders, and health resources—all in one place.
        </p>
        
        {/* --- UPDATED: Button Section --- */}
        <div className="mt-8">
            <p className="text-gray-600 mb-4 font-semibold">Choose your language to start:</p>
            <div className="flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => handleStartChat('en')}
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-teal-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300"
                >
                    Start in English
                </button>
                <button
                    onClick={() => handleStartChat('hi')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300"
                >
                    हिंदी में शुरू करें
                </button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
                 <Link
                    to="/vaccines"
                    className="bg-white text-teal-600 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                >
                    Get Vaccine Reminders
                </Link>
                <Link
                    to="/alerts"
                    className="bg-white text-teal-600 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                >
                    View Alerts
                </Link>
            </div>
        </div>

      </section>

      {/* Features Section (No Changes Needed) */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Vaccine Reminders",
            desc: "Stay on top of immunizations with timely notifications.",
          },
          {
            title: "Outbreak Alerts",
            desc: "Get district-level warnings for potential health risks.",
          },
          {
            title: "Health Resources",
            desc: "Access reliable information to keep your family safe.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-teal-600 to-cyan-600 text-white flex items-center justify-center rounded-full mb-6">
              <span className="text-2xl font-bold">{i + 1}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default LandingPage;