import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import ChatPage from './ChatPage';
import VaccinePage from './VaccinePage'; // <-- Import VaccinePage
import AlertsPage from './AlertsPage';   // <-- Import AlertsPage
import AboutPage from './AboutPage';
import './App.css'; // Keep this for global styles if any

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/vaccines" element={<VaccinePage />} /> {/* <-- Add this route */}
        <Route path="/alerts" element={<AlertsPage />} />   {/* <-- Add this route */}
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;