import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {
  let navigate = useNavigate();

  const [todo, setTodo] = useState("");
  const [message, setMessage] = useState("");
  // const [error, setError] = useState("");
  const notify = () => toast(message)
  console.log("message",message)
  console.log(todo);
  const handleSubmit = () => {
    console.log("submit button clicked");
    let data = todo;

    let config = {
      method: "post",
      url: "https://maneesh-users-service.herokuapp.com/todo/create",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "text/plain",
      },
      data: data,
    };

    // axios.post(
    //   "https://maneesh-users-service.herokuapp.com/todo/create",
    //   data,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       "Content-Type": "text/plain",
    //     },
    //   }
    // );
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.status === 200) {
          setMessage(response.data.message);

          setTodo("");
        }
      })
      .catch(function (error) {
        if(error){
          navigate('/login')
        }
        // setError(error.message);
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      {/* {error ? (
        <h3>Please Login</h3>
      ) : ( */}
        <div className="FormPage">
          <div className="user-form">
            
            <input
              onChange={(e) => setTodo(e.target.value)}
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter Your todo Here"
            />
          </div>

          <button
            onClick={()=>{handleSubmit(); notify()}}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
          <ToastContainer/>
          {/* <span style={{ color: "green", marginTop: "1rem" }}>
            {message.length > 0 ? message : null}
          </span> */}
        </div>
      {/* )} */}
    </React.Fragment>
  );
};

export default Todo;
