import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Modal from "../Modal/index";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  // const onClose = () => {
  //   if (isOpen) setIsOpen(false);
  // };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="container-fluid d-flex">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/auth/signout"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Sign out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/auth/signup"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/auth/signin"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Sign In
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/map"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Map
                    </NavLink>
                  </li>
                  
                </>
              )}

              <li>
                <IconButton onClick={() => setIsOpen(!isOpen)}>
                  <Badge
                    badgeContent={100}
                    color="secondary"
                    className="nav-item"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Modal open={isOpen}></Modal>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
