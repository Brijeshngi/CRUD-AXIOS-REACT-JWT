import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Delete = () => {
  let navigate = useNavigate();

  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  // const [error, setError] = useState("");

  console.log(id);
  const handleDelete = () => {
    var config = {
      method: "delete",
      url: `https://maneesh-users-service.herokuapp.com/todo/delete/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setId(response.data);
        
        setMessage(response.data.message);
      })
      .catch(function (error) {
        // setError(error.message);
        console.log(error);
        if(error){
          navigate('/login')
        }
      });
  };

  return (
    <React.Fragment>
      {/* {error ? (
        <h3>Please Login</h3>
      ) : ( */}
        <>
        <div className="user-form">
          <label>Enter the Id:</label>
          <input type="number" onChange={(e) => setId(e.target.value)} />
        </div>
          <button onClick={handleDelete}>Delete</button>
          <span style={{ color: "green", marginTop: "1rem" }}>
            {message.length > 0 ? message : null}
          </span>
          <br />
        </>
      {/* )} */}
    </React.Fragment>
  );
};

export default Delete;
