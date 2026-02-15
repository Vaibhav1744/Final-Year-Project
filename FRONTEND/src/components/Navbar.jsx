import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/roles";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">EM</div>

      {user && (
        <div className="nav-links">
          <NavLink to="/dashboard" className="nav-item">Home</NavLink>

          {user.role === ROLES.USER && (
            <NavLink to="/my-events" className="nav-item">My Events</NavLink>
          )}
        </div>
      )}

      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
