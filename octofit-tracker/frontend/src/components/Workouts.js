import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts component - Fetching from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts component - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts component - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center loading-spinner">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading workouts...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (level) => {
    const levelLower = (level || '').toLowerCase();
    if (levelLower === 'easy' || levelLower === 'beginner') return 'bg-success';
    if (levelLower === 'medium' || levelLower === 'intermediate') return 'bg-warning';
    if (levelLower === 'hard' || levelLower === 'advanced') return 'bg-danger';
    return 'bg-secondary';
  };

  return (
    <div className="container mt-4">
      <h1>💪 Personalized Workout Suggestions</h1>
      <div className="mb-4">
        <span className="badge bg-danger">Available Workouts: {workouts.length}</span>
        <button className="btn btn-success btn-sm ms-3">🔍 Find Workout</button>
      </div>
      <div className="row">
        {workouts.length > 0 ? (
          workouts.map(workout => (
            <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 border-success">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0 text-white">{workout.name}</h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <p className="card-text text-muted flex-grow-1">{workout.description || 'No description available'}</p>
                  <ul className="list-group list-group-flush mt-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>🏃 Type:</strong>
                      <span className="badge bg-info">{workout.workout_type || 'N/A'}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>📊 Difficulty:</strong>
                      <span className={`badge ${getDifficultyBadge(workout.difficulty_level)}`}>
                        {workout.difficulty_level || 'N/A'}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>⏱️ Duration:</strong>
                      <span className="badge bg-primary">{workout.duration} min</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>🔥 Calories:</strong>
                      <span className="badge bg-warning text-dark">{workout.estimated_calories || 'N/A'}</span>
                    </li>
                  </ul>
                  <div className="mt-3">
                    <button className="btn btn-success w-100">Start Workout</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning text-center" role="alert">
              <h4 className="alert-heading">No Workouts Available!</h4>
              <p>Check back soon for personalized workout suggestions tailored to your fitness goals.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
