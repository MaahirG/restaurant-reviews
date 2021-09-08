import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

// Front end functionality for when a specific restaurant is selected

const Restaurant = props => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(e => {console.log(e); });
  };

  // Telling React to run your “effect” function after flushing changes to the DOM (after render) in index.js
  // only called here if array[] is updated
  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  // Can only delete if logged in as the user that created the review
  // index is idx of review from review state array
  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        // restaurant state is set to the return of the function (=>) with updated prevState
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1) // remove the review from the array
          return({ ...prevState })
        })
      })
      .catch(e => {console.log(e); });
  };

  return (
    <div>
      {/* '{' means JS code - check if restaurant w/ternary */}
      {restaurant ? (
        <div>
          
          {/* Layout of the page if a restaurant is chosen */}
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
            <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          
          <Link to={"/restaurants/" + props.match.params.id + "/review"} className="btn btn-primary">
            Add Review
          </Link>

          <h4> Reviews </h4>
          <div className="row">
            {/* Check if there are reviews w/ternary */}
            {restaurant.reviews.length > 0 ? (
             restaurant.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">

                     {/* bootstrap cards */}
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}
                       </p>

                       {/* Display different buttons based on which user is logged in (author or not), && at the end means run the code below if all true */}
                       {props.user && props.user.id === review.user_id &&
                          <div className="row">
                            {/* Delete review */}
                            <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                            
                            {/* Edit review */}
                            <Link to={{
                              pathname: "/restaurants/" + props.match.params.id + "/review",
                              state: { currentReview: review } }} className="btn btn-primary col-lg-5 mx-1 mb-1">
                              Edit
                            </Link>
                          </div>                   
                       }
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;