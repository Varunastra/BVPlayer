import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auhtorizeUser } from "../actions/user";
import { Link, useHistory } from "react-router-dom";
import TextField from "../components/UI/TextField/TextField";
import Button from "../components/UI/Button/Button";
import ErrorMessage from "../components/UI/Error/ErrorMessage";

function SignIn() {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(auhtorizeUser(login, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.replace("/");
    }
  }, [isAuthenticated, history]);

  return (
    <>
      <form className="sign-in" onSubmit={handleLogin}>
        <div className="container">
          <h3>Sign in</h3>
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
          <Button type="submit">Login</Button>
          <div>
            First time?, <Link to="/register">register</Link> first
          </div>
        </div>
      </form>
    </>
  );
}

export default SignIn;
