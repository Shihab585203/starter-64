import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleCreateUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log(newUsers);
      })
      .catch((error) => console.error(error));

    event.target.reset();
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={handleCreateUser}>
          <input type="text" name="name" id="" placeholder="Name" /> <br />
          <input type="text" name="email" id="" placeholder="Email" /> <br />
          <input type="submit" value="Create User" />
        </form>
      </div>
      <h1>users: {users.length}</h1>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} {user.email}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
