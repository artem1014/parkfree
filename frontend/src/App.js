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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStart());
  }, []);

  return (
    <div style={{ position: 'relative' }}>

      <div style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
      }}>

        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          backgroundColor: '#224862',
          opacity: '0.8',

        }}></div>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${'https://images.unsplash.com/photo-1572799135571-73597b373a9e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1491&q=80'})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',

        }}></div>
      </div>


      < Router >

        <div className="container" style={{ position: "relative", minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: '60px' }} >
          < Nav />
          <Switch>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/auth/signout">
              <SignOut />
            </Route>
            <PrivateRoute exact path="/map">
              <Main />
            </PrivateRoute>
            <PrivateRoute exact path="/account">
              <Account />
            </PrivateRoute>
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
  );
}

export default App;
