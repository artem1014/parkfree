import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

function SignUp() {
  const changeStatusHandler = (e) => {
    e.preventDefault();
    const email = e.target.regEmail.value;
    const password = e.target.regPassword.value;
    const login = e.target.regLogin.value;

    axios
      .post(`${process.env.REACT_APP_HOST}/signup`, {
        email,
        password,
        login,
      })
      .then((res) => res.data) // получаем нового пользователя
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
      });
  };
  return (
    <Form onSubmit={changeStatusHandler}>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="regEmail" id="email" placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <Label for="login">Login</Label>
        <Input type="text" name="regLogin" id="login" placeholder="Login" />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="regPassword"
          id="password"
          placeholder="Password"
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default SignUp;
