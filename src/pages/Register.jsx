import React from "react";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [message, setMessage] = useState("");

  const notify = () => toast(message);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [birth, setBirth] = useState("");
  const newDate = moment(birth).format("DD-MM-YYYY");

  const handleSubmit = () => {
    let data = JSON.stringify({
      fullName: `${name}`,
      email: `${email}`,
      phoneNo: `${phone}`,
      dob: `${newDate}`,
      password: `${password}`,
    });

    let config = {
      method: "post",
      url: "https://maneesh-users-service.herokuapp.com/user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          setMessage(response.data.message);
          setName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setBirth("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <h1>Register Here</h1>
      <div className="container">
        <div className="user-form">
          <label htmlFor="name">Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Name"
          />
        </div>
        <div className="user-form">
          <label htmlFor="email">Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="user-form">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="user-form">
          <label htmlFor="dob">Date of Birth</label>
          <input
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            type="date"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Date of Birth"
          />
        </div>
        <div className="user-form">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            handleSubmit();
            notify();
          }}
        >
          Submit
        </button>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default Register;
