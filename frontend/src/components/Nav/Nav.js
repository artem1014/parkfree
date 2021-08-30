import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Badge from "@material-ui/core/Badge";
import Notification from "../Notification";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotificationsStart } from "../../redux/actions/notificationAC";
import { withStyles } from '@material-ui/core/styles';

const Nav = () => {
  const user = useSelector((state) => state.user);
  const notifications = useSelector((state) => state.notification)
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  console.log("notifications from Nav", notifications);

  useEffect(() => {
    // Задать userID
    dispatch(getAllNotificationsStart({ userID: 1 }));
  }, []);

  return (
    <nav className=" navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">

        <div className="container-fluid d-flex">
          <Link className="navbar-brand" to="/">Home</Link>
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
                  <li className="nav-item">
                    <NavLink
                      to="/test"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Images
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                <IconButton onClick={() => setIsOpen(!isOpen)}>
                  <Badge
                    badgeContent={notifications.length}
                    color="secondary"
                    className="nav-item"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Notification open={isOpen} notifications={notifications} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
//export default withStyles(styles)(ClassNames);
