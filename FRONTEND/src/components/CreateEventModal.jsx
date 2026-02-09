import { useState } from "react";
import api from "../services/api";

const CreateEventModal = ({ onClose, onCreated }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", form);
      alert("Event created successfully");
      onCreated();
      onClose();
    } catch (err) {
      alert("Failed to create event");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Create New Event</h3>

        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Event Title" required onChange={handleChange} />
          <textarea name="description" placeholder="Description" required onChange={handleChange} />
          <input type="date" name="date" required onChange={handleChange} />
          <input type="time" name="time" required onChange={handleChange} />
          <input name="venue" placeholder="Venue" required onChange={handleChange} />

          <div className="modal-actions">
            <button type="submit" className="btn primary">Create</button>
            <button type="button" className="btn secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
