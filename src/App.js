import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Todo from "./pages/Todo";
import Alltodo from "./pages/Alltodo";
import Edit from "./pages/Edit";
import Delete from "./pages/Delete";
import GetById from "./pages/GetById";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/all" element={<Alltodo />}></Route>
          <Route path="/edit" element={<Edit />}></Route>
          <Route path="/delete" element={<Delete />}></Route>
          <Route path="/byid" element={<GetById />}></Route>
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
