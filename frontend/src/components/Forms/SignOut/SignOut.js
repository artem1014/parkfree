import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signOutStart } from "../../../redux/actions/user.ac";

const SignOut = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state)
  useEffect(() => {
    // window.localStorage.removeItem("user");
    dispatch(signOutStart());

    history.push("/");
  }, []);

  return null;
};

export default SignOut;
