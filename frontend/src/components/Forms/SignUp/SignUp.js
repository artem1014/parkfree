import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { signUpStart } from "../../../redux/actions/user.ac"

const SignUp = () => {
  const [userSignUp, setUserSignUp] = useState({
    login: '',
    password: '',
    email: ''
  })

  let history = useHistory();

  const changeHandler = (e) => {
    setUserSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    let payload = Object.entries(userSignUp).filter((el) => el[1] ? el[1].trim() : el[1])
    if (payload.length) {
      payload = Object.fromEntries(payload)
      dispatch(signUpStart(payload, history))
    }
  }

  return (
    (
      <div className="d-flex justify-content-center">
        <form onSubmit={submitHandler} className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3">
          <legend className="text-center mb-4">User Sign Up</legend>
          <div className="mb-3">
            <input onChange={changeHandler} className="form-control" value={userSignUp.login} type="text" name="login" placeholder='login' />
          </div>

          <div className="mb-3">
            <input onChange={changeHandler} className="form-control" value={userSignUp.email} type="text" name="email" placeholder='email' />
          </div>
          <div className="mb-3">
            <input onChange={changeHandler} className="form-control" value={userSignUp.password} type="password" name="password" placeholder='password' />
          </div>

          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    )
  )
}
export default SignUp
