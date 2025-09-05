import React from "react";
import { Link } from "react-router-dom";

// --- Reusable Header Component (matches Landing Page) ---
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
        <Link to="/#english" className="hover:text-teal-200 transition">
          English ▾
        </Link>
        <Link to="/vaccines" className="hover:text-teal-200 transition">
          Vaccines
        </Link>
        <Link to="/alerts" className="hover:text-teal-200 transition">
          Alerts
        </Link>
        <Link to="/about" className="text-teal-200 font-semibold">
          About
        </Link>
      </nav>
    </div>
  </header>
);

const AboutPage = () => {
  return (
    <div className="font-sans bg-gradient-to-b from-cyan-50 to-white min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-16 md:py-24 text-gray-800">
        <div className="max-w-5xl mx-auto">
          {/* --- Mission Section --- */}
          <section className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
              Our <span className="text-teal-600">Mission</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              To bridge the healthcare information gap in India by providing every
              citizen with instant, reliable, and accessible health guidance in
              their own language.
            </p>
            <div className="mt-8">
              <Link
                to="/chat"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-teal-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300"
              >
                Start Chat
              </Link>
            </div>
          </section>

          {/* --- Why Arogya AI Section --- */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
              Why Arogya AI?
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/telemedicine-and-online-doctor-consultation-2974443-2477382.png"
                  alt="Digital health access illustration"
                  className="rounded-2xl shadow-lg hover:scale-105 transform transition duration-300"
                />
              </div>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  In a nation as vast and diverse as India, access to credible
                  health information is a fundamental right, yet it remains a
                  significant challenge. Misinformation spreads rapidly, leading to
                  delayed treatment and preventable health crises.
                </p>
                <p>
                  <strong className="text-teal-600">Arogya AI</strong> was born from
                  a simple idea: to leverage the power of Artificial Intelligence and
                  the reach of mobile technology to put a trusted health companion in
                  everyone's pocket. We are not just building an app; we are building
                  a lifeline.
                </p>
              </div>
            </div>
          </section>

          {/* --- Our Approach Section --- */}
          <section>
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
              Our Approach
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Accessibility First",
                  desc: "We deliver information through platforms people already use daily—like WhatsApp, SMS, and a simple web interface. No app download is required.",
                },
                {
                  title: "Trust & Accuracy",
                  desc: "Our AI is trained exclusively on data from official sources like the Ministry of Health & Family Welfare, ensuring every answer is reliable.",
                },
                {
                  title: "Language Inclusivity",
                  desc: "Powered by the Bhashini Mission, we are committed to breaking down linguistic barriers to make health information understandable to all.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
                >
                  <h3 className="text-xl font-bold text-teal-600 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-700">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
