import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ name: '', description: '' });

  useEffect(() => {
    fetch('https://improved-space-computing-machine-75grvqwrwr42rpp7-8000.app.github.dev/api/workouts/')
      .then(response => response.json())
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error fetching workouts:', error));
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit new workout
    console.log(newWorkout);
    handleClose();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Workouts</h1>
      <Button variant="primary" onClick={handleShow} className="mb-3">Add Workout</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Workout Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map(workout => (
            <tr key={workout._id}>
              <td>{workout.name}</td>
              <td>{workout.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter workout name"
                value={newWorkout.name}
                onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={newWorkout.description}
                onChange={(e) => setNewWorkout({ ...newWorkout, description: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Workouts;
