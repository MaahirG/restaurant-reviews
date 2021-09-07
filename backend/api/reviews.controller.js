import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {

  // Create (POST) handling - create a restaurant review with the body of the http request, store in db
  static async apiPostReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id
      const review = req.body.text
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const date = new Date()

      const ReviewResponse = await ReviewsDAO.addReview(
        restaurantId,
        userInfo,
        review,
        date,
      )

      res.json({ status: "Review successfully created" })

    } catch (e) {
        res.status(500).json({ error: e.message })    
    }
  }

  // Update (PUT) handling - update an existing restaurant review in the db, use the body of http request
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id
      const text = req.body.text
      const date = new Date()

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        text,
        date,
      )
 
      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error( "unable to update review - user may not be original poster", )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  // Delete (PUT) handling - delete an existing restaurant review in the db, use the body of http request (not normal to have body for delete in production - don't want to use auth)
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id
      const userId = req.body.user_id
      console.log(reviewId)
      const reviewResponse = await ReviewsDAO.deleteReview(
        reviewId,
        userId,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}