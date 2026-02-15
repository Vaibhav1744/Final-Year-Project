import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/roles";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import EventCard from "../components/EventCard";
import CreateEventModal from "../components/CreateEventModal";
import api from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [showModal, setShowModal] = useState(false);

  const loadEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = selectedDate
    ? events.filter((e) => e.date === selectedDate)
    : events;

  return (
    <Layout>
      <div className="dashboard">
        <Sidebar
          events={events}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          month={month}
          year={year}
          setMonth={setMonth}
          setYear={setYear}
        />

        <div className="events-grid">
          {user.role === ROLES.ORGANIZER && (
            <button
              className="btn primary"
              onClick={() => setShowModal(true)}
            >
              + Add New Event
            </button>
          )}

          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {showModal && (
        <CreateEventModal
          onClose={() => setShowModal(false)}
          onCreated={loadEvents}
        />
      )}
    </Layout>
  );
};

export default Dashboard;
