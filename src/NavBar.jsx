import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <nav className="nav">
      <div className="brand">🗳️ Voting App</div>
      <div className="links">
        <Link className={pathname === "/" ? "active" : ""} to="/">Voting Page</Link>
        <Link className={pathname === "/results" ? "active" : ""} to="/results">Results Page</Link>
      </div>
    </nav>
  );
}
