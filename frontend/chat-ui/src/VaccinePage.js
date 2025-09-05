import React from "react";
import { Link } from "react-router-dom";

// --- Header Component (same as Landing Page) ---
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
        <h1 className="text-2xl font-bold text-white tracking-wide">Arogya AI</h1>
      </Link>
      <nav className="hidden md:flex items-center space-x-8 text-white font-medium">
        <Link to="/#english" className="hover:text-teal-200 transition">English ▾</Link>
        <Link to="/vaccines" className="hover:text-teal-200 transition">Vaccines</Link>
        <Link to="/alerts" className="hover:text-teal-200 transition">Alerts</Link>
        <Link to="/about" className="hover:text-teal-200 transition">About</Link>
      </nav>
    </div>
  </header>
);

const VaccinePage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.elements.name.value,
      dob: e.target.elements.dob.value,
      phone: e.target.elements.phone.value,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Thank you! Your vaccination reminders have been set.");
        e.target.reset();
      } else {
        alert("⚠️ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
      alert("❌ Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="font-sans bg-gradient-to-b from-cyan-50 to-white min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-16">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
            Vaccine Reminder System
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Never miss a vaccination. Enter details below to receive personalized reminders.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Parent's Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-lg font-medium text-gray-700">
                Child's Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
                WhatsApp Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="+91 XXXXX XXXXX"
                required
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:from-teal-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300"
            >
              Set Reminders
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default VaccinePage;
