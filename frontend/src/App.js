import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import Nav from "./components/Nav/Nav";
import SignUp from "./components/Forms/SignUp/SignUp";
import SignOut from "./components/Forms/SignOut/SignOut";
import SignIn from "./components/Forms/SignIn/SignIn";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStart } from "./redux/actions/user.ac";
import MainScreen from "./components/MainScreen/MainScreen";
import Main from "./components/Main/Main";
import Account from "./components/Account/Account";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStart());
  }, []);

  return (

    <div className="App">

      <Router>
        <Nav />
        {/* <div className="container py-5"> */}
        < Switch >
          {/* <PrivateRoute path="/user/notesList">
            <Main />
          </PrivateRoute>  */}
          <Route exact path="/auth/signup">
            <SignUp />
          </Route>
          <Route exact path="/auth/signin">
            <SignIn />
          </Route>
          <Route exact path="/auth/signout">
            <SignOut />
          </Route>
          <Route exact path="/">
            <MainScreen />
          </Route>
          <Route exact path="/map">
            <Main />
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
