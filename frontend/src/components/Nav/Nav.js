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
import {
  getAllAcceptedMarkAct,
  getAllNewMarkAct,
} from "../../redux/actions/markActions";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const allMarks = useSelector((state) => state.marks);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { notificationValue } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (user) {
      console.log('From Nav');
      dispatch(getAllNotificationsStart());
      dispatch(getAllNotificationValueStart());
      dispatch(getAllAcceptedMarkAct());
    }
  }, [user]);

  const updateStatus = () => {
    dispatch(updateStatusNotificationsStart());
    setIsOpen(!isOpen);
  };

  return (
    <nav className={style.navbar__wrapper}>
      <div className={style.nav__container}>
        <div className={style.nav__logo}>
          <Link to="/">
            <img className={style.img} src={"./images/tachila1.svg"} />
          </Link>
        </div>
        <Link className={`${style.navbar_brand2} ${style.nav__text}`} to="/">
          ParkFree
        </Link>
        <ul className={style.nav__btns}>
          {user ? (
            user.role === "admin" ? (
              <>
                <li className={style.nav__btn}>
                  <NavLink
                    to="/auth/signout"
                    className={style.nav_item2}
                    activeClassName="active"
                  >
                    Sign out
                      </NavLink>
                </li>
                <li className={style.nav__btn}>
                  <NavLink
                    to="/account"
                    className={style.nav_item2}
                    activeClassName="active"
                  >
                    Account
                      </NavLink>
                </li>
                <li className={style.nav__btn}>
                  <NavLink
                    to="/map"
                    className={style.nav_item2}
                    activeClassName="active"
                  >
                    Map
                      </NavLink>
                </li>
                <li className={style.nav__btn}>
                  <IconButton onClick={updateStatus}>
                    <Badge
                      badgeContent={notificationValue}
                      color="secondary"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Notification open={isOpen} setIsOpen={setIsOpen} />
                </li>
              </>
            ) : (
              <>
                <li className="nav-item my-3">
                  <NavLink
                    to="/auth/signout"

                    className={style.nav_item2}
                    activeClassName="active"
                  >
                    Sign out
                      </NavLink>
                </li>
                <li className="nav-item my-3">
                  <NavLink
                    to="/map"
                    className={style.nav_item2}
                    activeClassName="active"
                  >
                    Map
                      </NavLink>
                </li>
                <li className={style.nav__btn}>
                  <IconButton color="inherit" onClick={updateStatus}>
                    <Badge
                      badgeContent={notificationValue}
                      color="secondary"
                      className="nav-item"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Notification open={isOpen} setIsOpen={setIsOpen} />
                </li>
              </>
            )
          ) : (
            <>
              <li className="nav-item my-3">
                <NavLink
                  to="/signup"
                  className={style.nav_item2}
                  activeClassName="active"
                >
                  Sign Up
                    </NavLink>
              </li>
              {" "}
              <li className="nav-item my-3">
                <NavLink
                  to="/signin"
                  className={style.nav_item2}
                  activeClassName="active"
                >
                  Sign In
                    </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
