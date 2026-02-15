import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/roles";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.date} ⏰ {event.time}</p>
      <p>{event.venue}</p>

      {user.role === ROLES.USER && (
        <button onClick={() => navigate(`/book/${event.id}`)}>
          Book Now
        </button>
      )}
    </div>
  );
};

export default EventCard;
