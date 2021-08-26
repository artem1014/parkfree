import { useSelector } from "react-redux";
import {
  Link,
  NavLink
} from "react-router-dom";

const Nav = () => {

  const user = useSelector(state => state.user)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="container-fluid d-flex">
          <Link className="navbar-brand" to="/">Home</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {
                user ?
                <>
                  <li className="nav-item">
                    <NavLink exact to="/auth/signout" className="nav-link" activeClassName="active">
                      Sign out
                    </NavLink>
                  </li>
                </>
                :
                <>
                  <li className="nav-item">
                    <NavLink exact to="/auth/signup" className="nav-link" activeClassName="active">
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink exact to="/auth/signin" className="nav-link" activeClassName="active">
                      Sign In
                    </NavLink>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
