import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

const MyEvents = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/my").then((res) => setBookings(res.data));
  }, []);

  return (
    <Layout>
      <h2>My Bookings</h2>
      {bookings.map((b) => (
        <div key={b.id}>
          <p>{b.event.title}</p>
        </div>
      ))}
    </Layout>
  );
};

export default MyEvents;
