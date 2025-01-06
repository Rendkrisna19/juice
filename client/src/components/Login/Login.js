import React, { useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import TokenRefresher from "../Utils/token";

function Login(props) {
  let [uname, setUname] = useState("");
  let [password, setPass] = useState("");
  let [error, setError] = useState("");

  // Adding click handler
  function handleClick() {
    if (validateInputs()) {
      const user = {
        email: uname,
        password: password,
      };
      let url = `${getBaseURL()}api/users/login`;
      axios
        .post(url, { ...user })
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            console.log("Logged in successfully");
            sessionStorage.setItem("isUserAuthenticated", true);
            const user = res.data[0].isAdmin;
            sessionStorage.setItem("customerId", res.data[0].userId);
            sessionStorage.setItem("isAdmin", user ? true : false);
            sessionStorage.setItem("jwt_token", res.data[0].token);
            sessionStorage.setItem("jwt_refresh_token", res.data[0].refreshToken);
            TokenRefresher(res.data[0].refreshToken);
            props.setUserAuthenticatedStatus(user ? true : false, res.data[0].userId);
          } else {
            console.log("User not available");
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("error");
        });
    }
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    return password.length >= 6;
  }

  function validateInputs() {
    if (!validateEmail(uname)) {
      setError("Please provide a valid email address.");
      return false;
    } else if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  }

  function changeName(event) {
    setUname(event.target.value);
  }

  function changePass(event) {
    setPass(event.target.value);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-700">
      <div className="relative bg-white bg-opacity-30 backdrop-blur-lg shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Login</h1>
        <div>
          <label className="block text-white font-medium mb-2">E-Mail</label>
          <input
            type="text"
            value={uname}
            onChange={changeName}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4">
          <label className="block text-white font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={changePass}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <button
          onClick={handleClick}
          className="w-full py-2 mt-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        <div
          className="text-blue-200 text-sm text-center mt-4 cursor-pointer hover:underline"
          onClick={() => props.navigateToRegisterPage()}
        >
          Is New User
        </div>
      </div>
    </div>
  );
}

export default Login;
