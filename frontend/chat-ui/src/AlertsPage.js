import React, { useState, useEffect } from "react";
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

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/alerts");
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const getLevelStyles = (level) => {
    switch (level) {
      case "High":
        return "bg-red-100 text-red-800 border-l-4 border-red-500";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500";
      case "Low":
        return "bg-green-100 text-green-800 border-l-4 border-green-500";
      default:
        return "bg-gray-100 text-gray-800 border-l-4 border-gray-500";
    }
  };

  return (
    <div className="font-sans bg-gradient-to-b from-cyan-50 to-white min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-16">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
            District-Level Outbreak Alerts
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Stay informed about public health advisories in your area.
          </p>

          {loading ? (
            <p className="text-center text-gray-500">Loading alerts...</p>
          ) : (
            <div className="space-y-6">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl shadow-sm hover:shadow-md transition ${getLevelStyles(alert.level)}`}
                >
                  <div className="text-sm font-semibold mb-2">
                    {alert.level} Risk
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {alert.disease} Alert in {alert.district}
                  </h3>
                  <p className="text-gray-700 mt-1">{alert.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AlertsPage;
