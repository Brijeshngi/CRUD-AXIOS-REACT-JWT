import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const GetById = () => {
  let navigate = useNavigate();

  const [id, setId] = useState("");
  const [error, setError] = useState("");
  // const [message, setMessage] = useState("");
  const [databyId, setDataById] = useState({});
  // const [loginError, setLoginError] = useState("");

  const handleFind = () => {
    var config = {
      method: "get",
      url: `https://maneesh-users-service.herokuapp.com/todo/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.data.todo);

        console.log(response.data.data);
        if (response) {
          setDataById(response.data.data.todo);
          // setMessage(response.data.message);
          setError("");
        }
      })
      .catch(function (error) {
        setError(error.message);
        setDataById({});
        // setLoginError(error.message);
        if(error){
          navigate('/login')
        }
        console.log(error);
      });
  };

  return (
    <React.Fragment>
        <div className="container">
          <div className="user-form">
          <input type="number" onChange={(e) => setId(e.target.value)} />
          </div>
          <button onClick={handleFind}>Find</button>
          <div className="card">
            {/* <span style={{ color: "green", marginTop: "1rem" }}>
              {message.length > 0 ? message : null}
            </span> */}
            <br />
            Description :
            {Object.keys(databyId).length > 0 ? databyId.description : null}
            <br />
            <br/>
            Creation Time :
            {Object.keys(databyId).length > 0 ? databyId.creationTime : null}
            <br />
            {Object.keys(databyId).length > 0 ? databyId.completed : null}
          </div>
          <h3>{error ? error : null}</h3>
        </div>
    
    </React.Fragment>
  );
};

export default GetById;
