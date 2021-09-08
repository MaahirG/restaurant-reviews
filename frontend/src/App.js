import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

function App() {

  //  Create a state variable for react app - using react hooks. setUser is a setter function
  const [user, setUser] = React.useState(null);

  // Note: Dummy login system - no db involved // todo update to google sign in provider
  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>

      {/* Boilerplate bootstrap navbar */}
      <nav className="navbar navbar-expand navbar-dark bg-dark">

        {/* Button1: website 'brand' part of the navbar - logo/title of website */}
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        
        {/* Button2: navigation */}
        <div className="navbar-nav mr-auto">
        
          {/* Link1: Links to restaurants */}
          <li className="nav-item">
            {/* Link --> React-router-dom functionality - if you click on "Restaurants, route to /restaurants" */}
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>

          {/* Link2: Link will either say login or logout (variable w/ternary operator) */}
          <li className="nav-item" >
            { user ? (

              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}> {/*Run logout function on click*/}
                Logout {user.name}
              </a>
            
            ) : (            
            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            
            )}
          </li>

        </div>
      </nav>

      <div className="container mt-3">

        {/* Init Routes */}
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
        
          {/* Use render instead of component to allow passing in of props(properties)  */}  
          <Route path="/restaurants/:id/review" render={(props) => (<AddReview {...props} user={user} /> )} />
          
          <Route path="/restaurants/:id" render={(props) => (<Restaurant {...props} user={user} /> )} />
          
          <Route path="/login" render={(props) => (<Login {...props} login={login} /> )} />
        
        </Switch>
      </div>
    </div>
  );
}

export default App;