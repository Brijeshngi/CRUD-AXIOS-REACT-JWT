import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Alltodo = () => {
  let navigate = useNavigate();

  const [description, setDescription] = useState([]);
  console.log(description)
 
  const getAllTodo = () => {
    var config = {
      method: "get",
      url: "https://maneesh-users-service.herokuapp.com/todo/all",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios(config)
      .then(function (response) {
       
        if (response) {
          setDescription(response.data.data.todos);
          
        }

        
      })
      .catch(function (error) {
        // setError(error.message);
        if (error) {
          navigate("/login");
        }
        console.log(error);
      });
  };

  useEffect(() => {
  
    getAllTodo();
  },[]);

  const TokenFromLocalStorage = localStorage.getItem("token");
  console.log("the token========", TokenFromLocalStorage);
  const ClearLocalStorage = () => {
    let storage = localStorage.removeItem("token");
    if (storage === undefined) {
      navigate("/login");
    }
  };

  return (
    <div>
    
      {description.length > 0
        ? description.map((item) => (
            <><div key={item.id} className="card" >
              <h3 >{item.description}</h3>
            </div>
            
            </>
            
            
          ))
        : <h1>No data found</h1>}
      
        <button onClick={ClearLocalStorage}>Logout</button>
      
    </div>
  );
};

export default Alltodo;
