import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import AuthService from "../services/authService";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert" role="alert">
        field required
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
      e.preventDefault();

      setMessage("");
      setLoading(true);

      const response = await AuthService.postLogin(username, password);
      if (response.data.id) {
          navigate("/");
          window.location.reload();
      } else {
          setMessage("Fail");
          setLoading(false);
    }
    
    // if (checkBtn.current.context._errors.length === 0) {
    //   AuthService.login(username, password).then(
    //     () => {
    //       navigate("/profile");
    //       window.location.reload();
    //     },
    //     (error) => {
          
    //     }
    //   );
    // }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">

        <form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
