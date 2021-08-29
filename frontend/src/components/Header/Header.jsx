import { Link, NavLink } from "react-router-dom";
// import { ReactSVG } from 'react-svg'

const Header = () => (
  <nav className="navbar navbar-expand-lg text-white navbar-light bg-light">
    <div className="container">
      <div className="container-fluid d-flex">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/main" activeClassName="active">
                Main
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-link"
                activeClassName="active"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/signup"
                className="nav-link"
                activeClassName="active"
              >
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

export default Header;
