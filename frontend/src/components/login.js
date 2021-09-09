  
import React, { useState } from "react";

const Login = props => {

  const initialUserState = {
    name: "",
    id: "",
  };

  // React hook
  const [user, setUser] = useState(initialUserState);

  // Function that takes event param w/target when onChange is triggered
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    // props.login (login function that was passed to this login page from App.js)
    props.login(user)
    // update the route
    props.history.push('/');
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <button onClick={login} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;