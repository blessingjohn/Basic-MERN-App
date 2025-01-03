import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listofUsers, setListofUsers] = useState([]);
  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [username,setUsername] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListofUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
    name: name, 
    age: age,
    username: username,
  }).then((response) => {
      setListofUsers([...listofUsers, {name:name,age: age,
        username: username,}])
    });
  };


  return (
    <div className="App">
      <div className="usersDisplay">
        {listofUsers.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>UserName: {user.username}</h1>
            </div>
          );
        })}
      </div>

      <div>
        <input type='text' placeholder='Name: ' onChange={(event) => {
          setName(event.target.value);}}></input>
        <input type='number' placeholder='Age: ' onChange={(event) => {
          setAge(event.target.value);}}></input>
        <input type='text' placeholder='UserName: ' onChange={(event) => {
          setUsername(event.target.value);}}></input>
          <button onClick={createUser}> Create User </button>
      </div>


    </div>
  );
}

export default App;
