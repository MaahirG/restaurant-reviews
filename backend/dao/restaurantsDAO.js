// import mongodb from "mongodb"
// const ObjectId = mongodb.ObjectID
let restaurants // use var as reference to database


export default class RestaurantsDAO {
    
    // NOTE: Class comprised of all async methods

    // how to intially connect to DB
    static async injectDB(conn) {
    if (restaurants) {
        return
    }
    try {
        // try to connect to db via environment variable and use mongodb collection: restaurants
        restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
    } catch (e) {
        console.error(`Unable to establish a collection handle in restaurantsDAO: ${e}`,)
    }
  }

    // call to get a list of restaurants in the DB
  static async getRestaurants({ filters = null, page = 0, restaurantsPerPage = 20, } = {}) {
    
    let query
    
    // filters can be an object, name/val: filters["cuisine"] = the actual cuisine
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } } // format of query that mongodb uses to search db 
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      }
    }

    let cursor
    
    // find all restaurants from db that match query
    try {
      cursor = await restaurants.find(query) 
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }

    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page) // get to a specific page of the search results in the DB

    try {
      const restaurantsList = await displayCursor.toArray()
      const totalNumRestaurants = await restaurants.countDocuments(query) // get total number of restaurants

      return { restaurantsList, totalNumRestaurants }

    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents, ${e}`,)
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }
  }

//   static async getRestaurantByID(id) {
//     try {
//       const pipeline = [
//         {
//             $match: {
//                 _id: new ObjectId(id),
//             },
//         },
//               {
//                   $lookup: {
//                       from: "reviews",
//                       let: {
//                           id: "$_id",
//                       },
//                       pipeline: [
//                           {
//                               $match: {
//                                   $expr: {
//                                       $eq: ["$restaurant_id", "$$id"],
//                                   },
//                               },
//                           },
//                           {
//                               $sort: {
//                                   date: -1,
//                               },
//                           },
//                       ],
//                       as: "reviews",
//                   },
//               },
//               {
//                   $addFields: {
//                       reviews: "$reviews",
//                   },
//               },
//           ]
//       return await restaurants.aggregate(pipeline).next()
//     } catch (e) {
//       console.error(`Something went wrong in getRestaurantByID: ${e}`)
//       throw e
//     }
//   }

//   static async getCuisines() {
//     let cuisines = []
//     try {
//       cuisines = await restaurants.distinct("cuisine")
//       return cuisines
//     } catch (e) {
//       console.error(`Unable to get cuisines, ${e}`)
//       return cuisines
//     }
//   }
}
