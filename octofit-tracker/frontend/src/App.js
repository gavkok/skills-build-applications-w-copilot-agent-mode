import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container mt-4">
      <div className="jumbotron p-5 rounded">
        <h1 className="display-4">Welcome to OctoFit Tracker! 🏃‍♂️</h1>
        <p className="lead">Track your fitness activities, compete with your team, and achieve your goals.</p>
        <hr className="my-4" />
        <p className="mb-4">Use the navigation menu above to explore different features:</p>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="card h-100 border-primary">
              <div className="card-body">
                <h5 className="card-title">📊 Activities</h5>
                <p className="card-text">View and track all your fitness activities and progress over time.</p>
                <a href="/activities" className="btn btn-primary btn-sm">Go to Activities</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card h-100 border-warning">
              <div className="card-body">
                <h5 className="card-title">🏆 Leaderboard</h5>
                <p className="card-text">See top performers and compete for the #1 ranking.</p>
                <a href="/leaderboard" className="btn btn-warning btn-sm">View Leaderboard</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card h-100 border-success">
              <div className="card-body">
                <h5 className="card-title">👥 Teams</h5>
                <p className="card-text">Browse teams, join a community, and work together towards fitness goals.</p>
                <a href="/teams" className="btn btn-success btn-sm">Explore Teams</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card h-100 border-info">
              <div className="card-body">
                <h5 className="card-title">👤 Users</h5>
                <p className="card-text">View all registered users and connect with fellow fitness enthusiasts.</p>
                <a href="/users" className="btn btn-info btn-sm">See Users</a>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <div className="card h-100 border-danger">
              <div className="card-body">
                <h5 className="card-title">💪 Workouts</h5>
                <p className="card-text">Get personalized workout suggestions tailored to your fitness level and goals.</p>
                <a href="/workouts" className="btn btn-danger btn-sm">Find Workouts</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img 
                src="/octofitapp-small.png" 
                alt="OctoFit Logo" 
                className="navbar-logo"
              />
              OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">🏠 Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">📊 Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">🏆 Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">👥 Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">👤 Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">💪 Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>

        <footer className="bg-light text-center text-muted py-3 mt-5">
          <div className="container">
            <p className="mb-0">© 2026 OctoFit Tracker - Stay Fit, Stay Active!</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
