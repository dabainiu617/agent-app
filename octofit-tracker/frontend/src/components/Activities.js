import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newActivity, setNewActivity] = useState({ activity_type: '', duration: '' });

  useEffect(() => {
    fetch('https://improved-space-computing-machine-75grvqwrwr42rpp7-8000.app.github.dev/api/activities/')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit new activity
    console.log(newActivity);
    handleClose();
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Activities</h1>
      <Button variant="primary" onClick={handleShow} className="mb-3">Add Activity</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Activity Type</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity._id}></tr>
              <td>{activity.activity_type}</td>
              <td>{activity.duration}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}></Modal>
        <Modal.Header closeButton>
          <Modal.Title>Add New Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Activity Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter activity type"
                value={newActivity.activity_type}
                onChange={(e) => setNewActivity({ ...newActivity, activity_type: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter duration"
                value={newActivity.duration}
                onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Activities;
