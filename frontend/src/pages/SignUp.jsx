import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/user";
import { useHistory } from "react-router-dom";
import TextField from "../components/UI/TextField/TextField";
import Button from "../components/UI/Button/Button";
import ErrorMessage from "../components/UI/Error/ErrorMessage";
import { useTitle } from "../hooks/useTitle";

function SignUp() {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const error = useSelector((state) => state.user.error);
  const history = useHistory();
  useTitle("SingUp");

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ login, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.replace("/");
    }
  }, [isAuthenticated, history]);

  return (
    <>
      <form className="sign-up" onSubmit={handleRegister}>
        <div className="container">
          <h3>Sign up</h3>
          <TextField
            value={login}
            type="text"
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Enter login"
          />
          <TextField
            value={password}
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <ErrorMessage error={error} />
          <Button type="submit">Register</Button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
