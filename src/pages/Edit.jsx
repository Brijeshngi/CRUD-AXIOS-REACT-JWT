import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  let navigate = useNavigate();

  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  // const [error, setError] = useState("");

  console.log(id);
  console.log(description);
  console.log(status);
  console.log(message);

  const SubmitButton = () => {
    var data = JSON.stringify({
      completed: status,
      description: `${description}`,
      id: id,
    });

    var config = {
      method: "post",
      url: `https://maneesh-users-service.herokuapp.com/todo/edit`,
      headers: {
        "X-API-Key": "",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data);
        setMessage(response.data.message);
      })
      .catch(function (error) {
        // setError(error.message);
        if(error){
          navigate('/login')
        }
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      {/* {error ? (
        <h3>Please Login </h3>
      ) : ( */}
        <div className="user-form">
          Id:
          <input type="number" onChange={(e) => setId(e.target.value)} />
          Description:
          <input type="text" onChange={(e) => setDescription(e.target.value)} />
          Status:<br/>
          <label>Completed</label>
          <input
            type="radio"
            value={status}
            onChange={(e) => setStatus(true)}
          />
          
          <label>Pending</label>
          <input
            type="radio"
            onChange={(e) => setStatus(false)}
          />
          
         
          <button onClick={SubmitButton}>Submit</button>
          <span style={{ color: "green", marginTop: "1rem" }}>
            {message.length > 0 ? message : null}
          </span>
        </div>
      {/* // )} */}
    </React.Fragment>
  );
};

export default Edit;
