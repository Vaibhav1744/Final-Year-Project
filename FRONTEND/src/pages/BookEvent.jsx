import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Layout from "../components/Layout";

const BookEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const book = async () => {
    await api.post(`/bookings/${eventId}`);
    alert("Booking successful");
    navigate("/my-events");
  };

  return (
    <Layout>
      <button onClick={book}>Confirm Booking</button>
    </Layout>
  );
};

export default BookEvent;
