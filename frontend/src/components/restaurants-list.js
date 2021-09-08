import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

// Front end functionality for homepage showing list of restaurants, get lists filtered and processed from db and display
// using bootstrap prebuilt nav and divs

const RestaurantsList = props => {
  
  // react hooks to create many state variables
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchZip, setSearchZip ] = useState("");
  const [searchCuisine, setSearchCuisine ] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  // Telling React to run your “effect” function after flushing changes to the DOM (after render) in index.js
  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  // called when typing in search box + set state vars
  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  // called when typing in search box + set state vars
  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  // called when typing in search box + set state vars
  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
    
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
        
      })
      .catch(e => { console.log(e); });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        console.log(response.data);
        // first item in drop down menu is all cuisines
        setCuisines(["All Cuisines"].concat(response.data));
        
      })
      .catch(e => { console.log(e); });
  };

  // used when using "search all cuisine" button
  const refreshList = () => {
    retrieveRestaurants();
  };

  // find/search helper function
  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => { console.log(e); });
  };

  // search by name
  const findByName = () => {
    find(searchName, "name")
  };
  
  // search by zip
  const findByZip = () => {
    find(searchZip, "zipcode")
  };

  // search by cuisine
  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    }
  };

  return (

    // html + boilerplate booststrap

    <div>
      <div className="row pb-1">
        
        {/*4 ways people can search on website */}
        
        {/* Search by name, text & button */}          
        <div className="input-group col-lg-4"> 
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>

        {/* Search by zip, text & button */}
        {/* Set state variable ONCHANGE */}
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip} 
          />
          
          {/* Perform search ONCLICK of button*/}
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip} 
            >
              Search
            </button>
          </div>
        </div>

        {/* Search by cuisine - dropdown menu */}
        <div className="input-group col-lg-4">
          
          <select onChange={onChangeSearchCuisine}>
            {/* map each cuisine: for each cuisine in the cuisines array, return an option for its select box  */}
            {cuisines.map(cuisine => { return ( <option value={cuisine}> {cuisine.substr(0, 20)} </option> ) })}
          </select>

          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>

        </div>
      </div>

      <div className="row">
        {/* For each restaurant in cur state: return cards (template from bootstrap). also get address from database */}
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                  <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View Reviews
                  </Link>

                  {/* Link to google maps */}
                  <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default RestaurantsList;