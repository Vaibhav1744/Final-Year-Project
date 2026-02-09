import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Layout from "../components/Layout";

const AdminPanel = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user.role === ROLES.ADMIN) {
      api.get("/events").then((res) => setEvents(res.data));
    }
  }, [user]);

  if (user.role !== ROLES.ADMIN) {
    return (
      <Layout>
        <h2 style={{ padding: "30px" }}>❌ Access Denied</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container">
        <h2>Admin Panel</h2>

        {events.map((event) => (
          <div key={event.id} className="admin-card">
            <h3>{event.title}</h3>
            <p>{event.date} ⏰ {event.time}</p>
            <p>{event.venue}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AdminPanel;
