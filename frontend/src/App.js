import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter/PrivateRouter";
import Nav from "./components/Nav/Nav";
import SignUp from "./components/Forms/SignUp/SignUp";
import SignOut from "./components/Forms/SignOut/SignOut";
import SignIn from "./components/Forms/SignIn/SignIn";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStart } from "./redux/actions/user.ac";
import Main from "./components/Main/Main";
import Account from "./components/Account/Account";
import MainScreen from "./components/MainScreen/MainScreen";
import TestImage from "./components/testImage";
// import { blue } from "@material-ui/core/colors";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStart());
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundColor: "#224862",
          opacity: "0.8",
        }}
      ></div>

      <div
        style={{
          backgroundImage: `url(${"https://images.unsplash.com/photo-1572799135571-73597b373a9e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1491&q=80"})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          overflow: "hidden",
        }}
      >
        <Router>
          <Nav />
          {/* <div className="container py-5"> */}
          <div style={{ position: "relative" }}>
            <Switch>
              {/* <PrivateRoute path="/user/notesList">
            <Main />
          </PrivateRoute>  */}
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/signin">
                <SignIn />
              </Route>
              <Route exact path="/auth/signout">
                <SignOut />
              </Route>
              <Route exact path="/map">
                <Main />
              </Route>
              <Route exact path="/account">
                <Account />
              </Route>
              <Route exact path="/test">
                <TestImage />
              </Route>
              <Route exact path="/">
                <MainScreen />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
