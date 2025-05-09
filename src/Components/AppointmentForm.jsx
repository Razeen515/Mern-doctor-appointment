import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";

const AppointmentForm = ({ doctors, onBookAppointment }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    doctor: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.doctor || !formData.date || !formData.time) {
      setError("All fields are required!");
      return;
    }

    setError(null);
    setSuccess("Appointment booked successfully!");

    
    if (onBookAppointment) {
      onBookAppointment(formData);
    }

    
    setFormData({ name: "", email: "", doctor: "", date: "", time: "" });

    
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <Container style={styles.container}>
      <Card style={styles.card}>
        <Card.Body>
          <h2 style={styles.title}>Book an Appointment</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Name Field */}
            <Form.Group controlId="name">
              <Form.Label style={styles.label}>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Enter your name"
              />
            </Form.Group>

            {/* Email Field */}
            <Form.Group controlId="email" className="mt-3">
              <Form.Label style={styles.label}>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Enter your email"
              />
            </Form.Group>

            {/* Doctor Selection */}
            <Form.Group controlId="doctor" className="mt-3">
              <Form.Label style={styles.label}>Select Doctor</Form.Label>
              <Form.Control
                as="select"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name} ({doc.specialty})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Date Picker */}
            <Form.Group controlId="date" className="mt-3">
              <Form.Label style={styles.label}>Select Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </Form.Group>

            {/* Time Picker */}
            <Form.Group controlId="time" className="mt-3">
              <Form.Label style={styles.label}>Select Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </Form.Group>

            {/* Submit Button */}
            <Button type="submit" style={styles.button} className="mt-4">
              Book Appointment
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

// **Inline Styles**
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
    borderRadius: "10px",
    background: "white",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    transition: "0.3s ease-in-out",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    transition: "0.3s",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    background: "linear-gradient(135deg, #42e695, #3bb2b8)",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "0.3s ease-in-out",
  },
};

export default AppointmentForm;
