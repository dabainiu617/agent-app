import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', members: '' });

  useEffect(() => {
    fetch('https://improved-space-computing-machine-75grvqwrwr42rpp7-8000.app.github.dev/api/teams/')
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit new team
    console.log(newTeam);
    handleClose();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Teams</h1>
      <Button variant="primary" onClick={handleShow} className="mb-3">Add Team</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.members.map(member => member.username).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter team name"
                value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Members</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter members"
                value={newTeam.members}
                onChange={(e) => setNewTeam({ ...newTeam, members: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Teams;
