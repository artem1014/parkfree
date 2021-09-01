import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Badge from "@material-ui/core/Badge";
import Notification from "../Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotificationsStart,
  getAllNotificationValueStart,
  updateStatusNotificationsStart,
} from "../../redux/actions/notificationAC";


import style from "./Nav.module.css";
import logos from "./car.svg";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const { notification, notificationValue } = useSelector(
    (state) => state.notifications
  );
  console.log(notification);
  console.log(notificationValue);

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotificationsStart());
    dispatch(getAllNotificationValueStart());
  }, []);

  const updateStatus = () => {
    dispatch(updateStatusNotificationsStart());
    setIsOpen(!isOpen);
  };

  if (user) {
    console.log('==========user===>', user.role === 'admin')
  }

  return (
    <nav className=" navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* logo */}
        <div className={style.logo}>
          <Link to='/'>
            {/* <img className={style.img} src={'https://www.vhv.rs/dpng/d/55-555134_vector-cars-logo-png-transparent-png.png'} /> */}
            <img className={style.img} src={'./images/Daco_555134.png'} />
          </Link>
        </div>

        <div className="container-fluid d-flex">
          <Link className="navbar-brand" to="/">
            Park Free
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {user ? (
                (user.role === 'admin') ? (
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
                    <li className="nav-item">
                      <NavLink
                        to="/account"
                        className="nav-link"
                        activeClassName="active"
                      >
                        Account
                    </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/images"
                        className="nav-link"
                        activeClassName="active"
                      >
                        Images
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
                    <li>
                      <IconButton onClick={updateStatus}>
                        <Badge
                          badgeContent={notificationValue}
                          color="secondary"
                          className="nav-item"
                        >
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                      <Notification open={isOpen} notification={notification} />
                    </li>
                  </>
                )
                  :
                  (
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
                      <li className="nav-item">
                        <NavLink
                          to="/images"
                          className="nav-link"
                          activeClassName="active"
                        >
                          Images
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
                      <li>
                        <IconButton onClick={updateStatus}>
                          <Badge
                            badgeContent={notificationValue}
                            color="secondary"
                            className="nav-item"
                          >
                            <NotificationsIcon />
                          </Badge>
                        </IconButton>
                        <Notification open={isOpen} notification={notification} />
                      </li>
                    </>
                  )
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/signup"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/signin"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Sign In
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav >
  );
};

export default Nav;
//export default withStyles(styles)(ClassNames);
