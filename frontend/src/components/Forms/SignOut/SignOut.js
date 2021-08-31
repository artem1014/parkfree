import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signOutStart } from "../../../redux/actions/user.ac";

const SignOut = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    // window.localStorage.removeItem("user");
    dispatch(signOutStart());
    history.push("/");
  }, []);

  return null;
};

export default SignOut;
