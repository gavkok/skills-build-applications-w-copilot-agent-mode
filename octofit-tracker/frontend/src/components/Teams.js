import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams component - Fetching from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams component - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Teams component - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center loading-spinner">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading teams...</p>
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

  return (
    <div className="container mt-4">
      <h1>👥 Teams</h1>
      <div className="mb-4">
        <span className="badge bg-success">Total Teams: {teams.length}</span>
        <button className="btn btn-primary btn-sm ms-3">+ Create New Team</button>
      </div>
      <div className="row">
        {teams.length > 0 ? (
          teams.map(team => (
            <div key={team.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card border-primary">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0 text-white">{team.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted">{team.description || 'No description available'}</p>
                  <ul className="list-group list-group-flush mt-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>👤 Members:</strong>
                      <span className="badge bg-primary rounded-pill">{team.member_count || 0}</span>
                    </li>
                    <li className="list-group-item">
                      <strong>📅 Created:</strong> {new Date(team.created_at).toLocaleDateString()}
                    </li>
                  </ul>
                  <div className="mt-3">
                    <button className="btn btn-outline-primary btn-sm me-2">View Details</button>
                    <button className="btn btn-outline-success btn-sm">Join Team</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info text-center" role="alert">
              <h4 className="alert-heading">No Teams Yet!</h4>
              <p>Create the first team and start competing together.</p>
              <button className="btn btn-primary mt-2">+ Create First Team</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
