import React, { useState } from 'react';
import './UserProfile.css'; // Optional CSS file for styling

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUser(data.results[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-profile-container">
      <h1>Random User Profile</h1>
      {loading ? (
        <p>Loading user data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        user && (
          <div className="user-card">
            <img src={user.picture.large} alt="User Avatar" className="user-avatar" />
            <h2>{`${user.name.first} ${user.name.last}`}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Location:</strong> {`${user.location.city}, ${user.location.country}`}</p>
            <button onClick={fetchUser} className="fetch-button">
              Get Another User
            </button>
          </div>
        )
      )}
      {!user && !loading && !error && (
        <button onClick={fetchUser} className="fetch-button">
          Generate User Profile
        </button>
      )}
    </div>
  );
};

export default UserProfile;
