import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const notify = () => toast(message)
  console.log("email ", email);
  console.log("Password ", password);

  const handleSubmit = () => {
    console.log("clicked submit");
    

    let data = JSON.stringify({
      email: `${email}`,
      password: `${password}`,
    });

    var config = {
      method: "post",
      url: "https://maneesh-users-service.herokuapp.com/user/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          navigate('/all')
          setMessage(response.data.message);
          console.log(response.data);
          localStorage.setItem("token", response.data.data.token);
          setEmail("")
          setPassword("")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const TokenFromLocalStorage = localStorage.getItem("token")
  useEffect(()=>{
    if(TokenFromLocalStorage){ 
      navigate('/all')
    }

  },[TokenFromLocalStorage])

  return (
    <div className="Container">
      <div className="user-form">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div className="user-form">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>

      <button onClick={()=>{handleSubmit(); notify()}} type="submit" className="btn btn-primary">
        Login
      </button>
      <ToastContainer />

    </div>
  );
};

export default Login;
