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
  }, [user]); // вот тут может быть ошибка

  const updateStatus = () => {
    dispatch(updateStatusNotificationsStart());
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${style.bg}`}>
      <div className="container">

        <div className={style.logo}>
          <Link to="/">
            <img className={style.img} src={"./images/Daco_555134.png"} />
          </Link>
        </div>
        <div className="container-fluid d-flex">
          <Link className={style.navbar_brand2} to="/map">
            Park Free
          </Link>
          <div className={style.navbar} id="navbarNav">
            <ul className="navbar-nav">
              {user ? (
                user.role === "admin" ? (
                  <>
                    <li className="nav-item mx-3 my-3">
                      <NavLink
                        to="/auth/signout"
                        className={style.nav_item2}
                        activeClassName="active"
                      >
                        Sign out
                      </NavLink>
                    </li>
                    <li className="nav-item mx-3 my-3">
                      <NavLink
                        to="/account"
                        className={style.nav_item2}
                        activeClassName="active"
                      >
                        Account
                      </NavLink>
                    </li>
                    <li className="nav-item mx-3 my-3">
                      <NavLink
                        to="/map"
                        className={style.nav_item2}
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
                          className="nav-item mx-3 my-3"
                        >
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                      <Notification open={isOpen} setIsOpen={setIsOpen} />
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item mx-3 my-3">
                      <NavLink
                        to="/auth/signout"

                        className={style.nav_item2}
                        activeClassName="active"
                      >
                        Sign out
                      </NavLink>
                    </li>
                    <li className="nav-item mx-3 my-3">
                      <NavLink
                        to="/map"
                        className={style.nav_item2}
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
                          className="nav-item mx-5"
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
                  <li className="nav-item mx-3 my-3">
                    <NavLink
                      to="/signup"
                      className={style.nav_item2}
                      activeClassName="active"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  {" "}
                  <li className="nav-item mx-5 my-3">
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
        </div>
      </div>
    </nav>
  );
};

export default Nav;
//export default withStyles(styles)(ClassNames);


// <nav className=" navbar navbar-expand-lg navbar-light bg-light">
// <div className="container">
//   <div className={style.logo}>
//     <Link to='/'>
//       {/* <img className={style.img} src={'https://www.vhv.rs/dpng/d/55-555134_vector-cars-logo-png-transparent-png.png'} /> */}
//       <img className={style.img} src={'./images/Daco_555134.png'} />
//     </Link>
//   </div>

//   <div className="container-fluid d-flex">
//     <Link className="navbar-brand" to="/">
//       Park Free
//     </Link>
//     <div className="collapse navbar-collapse" id="navbarNav">
//       <ul className="navbar-nav">
//         {user ? (
//           (user.role === 'admin') ? (
//             <>
//               <li className="nav-item">
//                 <NavLink
//                   to="/auth/signout"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   Sign out
//               </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/account"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   Account
//               </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/images"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   Images
//               </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/map"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   Map
//               </NavLink>
//               </li>
//               <li>
//                 <IconButton onClick={updateStatus}>
//                   <Badge
//                     badgeContent={notificationValue}
//                     color="secondary"
//                     className="nav-item"
//                   >
//                     <NotificationsIcon />
//                   </Badge>
//                 </IconButton>
//                 <Notification open={isOpen} notification={notification} />
//               </li>
//             </>
//           )
//             :
//             (
//               <>
//                 <li className="nav-item">
//                   <NavLink
//                     to="/auth/signout"
//                     className="nav-link"
//                     activeClassName="active"
//                   >
//                     Sign out
//               </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink
//                     to="/images"
//                     className="nav-link"
//                     activeClassName="active"
//                   >
//                     Images
//               </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink
//                     to="/map"
//                     className="nav-link"
//                     activeClassName="active"
//                   >
//                     Map
//               </NavLink>
//                 </li>
//                 <li>
//                   <IconButton onClick={updateStatus}>
//                     <Badge
//                       badgeContent={notificationValue}
//                       color="secondary"
//                       className="nav-item"
//                     >
//                       <NotificationsIcon />
//                     </Badge>
//                   </IconButton>
//                   <Notification open={isOpen} notification={notification} />
//                 </li>
//               </>
//             )
//         ) : (
//           <>
//             <li className="nav-item">
//               <NavLink
//                 to="/signup"
//                 className="nav-link"
//                 activeClassName="active"
//               >
//                 Sign Up
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="/signin"
//                 className="nav-link"
//                 activeClassName="active"
//               >
//                 Sign In
//               </NavLink>
//             </li>
//           </>
//         )}
//       </ul>
//     </div>
//   </div>
// </div>
// </nav >
// );
// };
