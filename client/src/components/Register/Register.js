import React, { useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";

function Register(props) {
  let [email, setEmail] = useState("");
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [pass, setPass] = useState("");
  const [isAdmin, setAdmin] = useState("0");
  const [error, setError] = useState("");

  const handleUserRegistration = () => {
    if (validateInputs()) {
      const newUser = {
        email: email,
        password: pass,
        isAdmin: isAdmin,
        fname: fname,
        lname: lname,
      };

      let url = `${getBaseURL()}api/users/register`;
      axios
        .post(url, { ...newUser })
        .then((res) => {
          if (res.data != null) {
            console.log("User registered successfully");
            props.navigateToLoginPage();
          }
        })
        .catch((err) => console.log("Sorry unable to add new user"));
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateInputs = () => {
    if (!validateEmail(email)) {
      setError("Please provide a valid email address.");
      return false;
    } else if (fname.trim() === "") {
      setError("Please provide your first name.");
      return false;
    } else if (lname.trim() === "") {
      setError("Please provide your last name.");
      return false;
    } else if (!validatePassword(pass)) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const updateAdmin = (adminValue) => {
    setAdmin(adminValue);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-600">
      <div className="relative bg-white bg-opacity-30 backdrop-blur-lg shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Register
        </h1>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">E-Mail</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">First Name</label>
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Last Name</label>
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Password</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="customer"
              name="role"
              value="0"
              checked={isAdmin === "0"}
              onChange={() => updateAdmin("0")}
              className="mr-2"
            />
            <label htmlFor="customer" className="text-white">
              Customer
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="admin"
              name="role"
              value="1"
              checked={isAdmin === "1"}
              onChange={() => updateAdmin("1")}
              className="mr-2"
            />
            <label htmlFor="admin" className="text-white">
              Admin
            </label>
          </div>
        </div>
        <button
          onClick={handleUserRegistration}
          className="w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Register
        </button>
        <div
          className="text-green-200 text-sm text-center mt-4 cursor-pointer hover:underline"
          onClick={() => props.navigateToLoginPage()}
        >
          Already Logged In User
        </div>
      </div>
    </div>
  );
}

export default Register;
