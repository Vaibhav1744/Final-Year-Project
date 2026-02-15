import Layout from "../components/Layout";

const Upcoming = () => {
  return (
    <Layout>
      <div className="page-container">
        <h2>Upcoming Events</h2>

        <div className="upcoming-list">
          <div className="upcoming-card">
            <h3>Tech Meetup 2026</h3>
            <p>📅 10 May 2026</p>
            <p>📍 Nagpur Convention Center</p>
          </div>

          <div className="upcoming-card">
            <h3>Music Night</h3>
            <p>📅 18 May 2026</p>
            <p>📍 City Arena</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Upcoming;
