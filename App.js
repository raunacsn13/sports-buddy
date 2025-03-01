import React from 'react';

function App() {
  return (
    <div>
      <h1>Fantasy Sports Chatbot</h1>
      <p>Live Sports Updates & Stats</p>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import axios from "axios";
import "./styles.css";  // CSS for styling

Chart.register(ArcElement);

// ✅ Sport Distribution Data
const chartData = {
  labels: ["Cricket", "Football", "Basketball"],
  datasets: [
    {
      data: [45, 35, 20], // Sample data
      backgroundColor: ["#4CAF50", "#3498DB", "#F39C12"],
    },
  ],
};

// ✅ Live Score Fetching Component
function LiveScore() {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    axios.get("https://sports-buddy-jh32.onrender.com/live-scores")
      .then((res) => setScores(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);
  return (
    <div className="box">
      <h3>Live Match Scores</h3>
      {scores.length > 0 ? scores.map((match, i) => (
        <p key={i}>{match.team1} vs {match.team2} - {match.score}</p>
      )) : <p>Loading scores...</p>}
    </div>
  );
}

// ✅ Navbar Component
function Navbar() {
  return (
    <nav className="navbar">
      <h2>🏆 SportyBuddy</h2>
      <ul>
        <li><Link to="/">Stats</Link></li>
        <li><Link to="/matches">Matches</Link></li>
        <li><Link to="/team">Team</Link></li>
        <li><Link to="/wallet">Wallet</Link></li>
      </ul>
    </nav>
  );
}

// ✅ Main App Component
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <h1>Your Fantasy Sports Assistant</h1>
        <p>Get real-time match updates, player stats, fantasy recommendations, and customer support.</p>

        <Routes>
          <Route path="/" element={
            <div className="box">
              <h3>Your Sport Interests</h3>
              <Pie data={chartData} />
            </div>
          } />
          <Route path="/matches" element={<LiveScore />} />
          <Route path="/team" element={<div className="box"><h3>Fantasy Team Selection</h3></div>} />
          <Route path="/wallet" element={<div className="box"><h3>Wallet & Transactions</h3></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
