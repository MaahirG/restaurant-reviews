import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"

const router = express.Router()

// create the different routes that people can navigate to
// controller file is what route uses 
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
// router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
// router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

// router
//   .route("/review")
//   .post(ReviewsCtrl.apiPostReview)
//   .put(ReviewsCtrl.apiUpdateReview)
//   .delete(ReviewsCtrl.apiDeleteReview)

export default router