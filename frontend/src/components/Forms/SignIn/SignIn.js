import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { signInStart } from "../../../redux/actions/user.ac";
import style from "./signin.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
  });

  const userSign = useSelector((state) => state.user);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/map" } };

  const changeHandler = (e) => {
    setUserSignIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const notify = () =>
    toast("ВВЕДИ НОРМАЛЬНЫЕ ДАННЫЕ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const submitHandler = (e) => {
    e.preventDefault();
    let payload = Object.fromEntries(new FormData(e.target));
    dispatch(signInStart(payload, history, from));
    if (userSign === null) {
      notify();
    }
  };

  return (
    (
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className=".card_sign_in">
            <form onSubmit={submitHandler} >
              <legend className="text-center text-light">Sign In</legend>
              <div className="mb-3">
                <input onChange={changeHandler} value={userSignIn.email} className={style.form_controlFreePar} type="email" name="email" placeholder='email' />
              </div>
              <div className="mb-3">
                <input onChange={changeHandler} value={userSignIn.password} className={style.form_controlFreePar} type="password" name="password" placeholder='password' />
              </div>
              <button className={style.button_register} type="submit" >Sign In</button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    )
  )
}

export default SignIn;
