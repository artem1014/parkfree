import './App.css';
import TestImage from './components/testImage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import Nav from './components/Nav/Nav';
import SignUp from './components/Forms/SignUp/SignUp';
import SignOut from './components/Forms/SignOut/SignOut';
import SignIn from './components/Forms/SignIn/SignIn';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthStart } from './redux/actions/user.ac';
import MainScreen from './components/MainScreen/MainScreen';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthStart())
  }, [])

  return (
    <Router>
      <Nav />
      <div className="container py-5">
        <Switch>
          {/* <PrivateRoute path="/user/notesList">
            <Main />
          </PrivateRoute>  */}
          <Route path="/auth/signup">
            <SignUp />
          </Route>
          <Route path="/auth/signin">
            <SignIn />
          </Route>
          <Route path="/auth/signout">
            <SignOut />
          </Route>
          <Route path="/">
            <MainScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
