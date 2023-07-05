import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const { error, signUp, currentUser } = useAuth();
  const [err, setError] = useState("");
  const [backError, setBackError] = useState("");
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    console.log("I am in");
    if (error) {
      setTimeout(() => {
        setBackError("");
      }, 5000);
      setBackError(error);
    }
  }, [error, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, fullName } = user;

    if (
      password === "" ||
      confirmPassword === "" ||
      email === "" ||
      fullName === ""
    ) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please fill in all fields");
    } else if (password !== confirmPassword) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password does not match");
    } else if (password.length < 6 || confirmPassword.length < 6) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password must be at least 6 characters long");
    } else {
      signUp(email, password, fullName);
      setUser({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="box">
      {err
        ? err && <p className="error">{err}</p>
        : backError && <p className="error">{backError}</p>}

      <form onSubmit={handleSubmit} className="form">
        <h2>Registration Form</h2>
        <div className="inputfield">
          <input
            type="text"
            placeholder="Username"
            value={user.fullName}
            name="fullName"
            onChange={handleChange}
          />
        </div>
        <div className="inputfield">
          <input
            type="text"
            placeholder="Email"
            value={user.email}
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="inputfield">
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="inputfield">
          <input
            type="password"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
        </div>
        <div className="inputfield">
          <input type="submit" />
        </div>
        <p className="forget">
          Don't have an account? <a href="">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
