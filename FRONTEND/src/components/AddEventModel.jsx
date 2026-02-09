import { useState } from "react";

const AddEventModal = ({ addEvent }) => {
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Event</h3>

        <form onSubmit={handleSubmit}>
          <input placeholder="Title" required
            onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input type="date" required
            onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input placeholder="Time" required
            onChange={(e) => setForm({ ...form, time: e.target.value })} />
          <input placeholder="Venue" required
            onChange={(e) => setForm({ ...form, venue: e.target.value })} />
          <input placeholder="Image URL"
            onChange={(e) => setForm({ ...form, image: e.target.value })} />

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
