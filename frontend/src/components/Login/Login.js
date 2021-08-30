import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

function Login() {
  return (
    <div className="container py-5">
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="your email..."
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="your password "
          />
        </FormGroup>
        <Button>Login</Button>
      </Form>
    </div>
  );
}


export default Login;
