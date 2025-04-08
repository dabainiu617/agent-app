import React, { useEffect, useState } from 'react';
import { Table, Card } from 'react-bootstrap';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch('https://improved-space-computing-machine-75grvqwrwr42rpp7-8000.app.github.dev/api/leaderboard/')
      .then(response => response.json())
      .then(data => setLeaderboard(data))
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Leaderboard</h1>
      {leaderboard.map(entry => (
        <Card key={entry._id} className="mb-3">
          <Card.Body>
            <Card.Title>{entry.user.username}</Card.Title>
            <Card.Text>Score: {entry.score}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Leaderboard;
