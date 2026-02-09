import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/roles";
import Layout from "../components/Layout";

const Contact = () => {
  const { user } = useAuth();

  if (user.role !== ROLES.ORGANIZER) {
    return (
      <Layout>
        <h2 style={{ padding: "30px" }}>
          ❌ Only organizers can request new events
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container">
        <h2>Request New Event</h2>
        <form className="contact-form">
          <input placeholder="Event Title" />
          <textarea placeholder="Event Description" />
          <button className="btn primary">Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
