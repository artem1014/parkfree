import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { signInStart } from "../../../redux/actions/user.ac";

const SignIn = () => {
  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const changeHandler = (e) => {
    setUserSignIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault(); //  чтобы при нажатии кнопки не происходила перерендера страницы
    let payload = Object.entries(userSignIn).filter((el) =>
      el[1] ? el[1].trim() : el[1]
    );
    if (payload.length) {
      payload = Object.fromEntries(payload);
      dispatch(signInStart(payload, history, from));
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={submitHandler}
        className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3"
      >
        <legend className="text-center mb-4">User Sign In</legend>
        <div className="mb-3">
          <input
            onChange={changeHandler}
            value={userSignIn.email}
            className="form-control"
            type="text"
            name="email"
            placeholder="email"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={changeHandler}
            value={userSignIn.password}
            className="form-control"
            type="password"
            name="password"
            placeholder="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
