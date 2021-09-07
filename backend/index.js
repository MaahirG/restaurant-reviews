import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js" // import file
import ReviewsDAO from "./dao/reviewsDAO.js" // import file

// 
// Connect to DB, listen on port and init config
// THIS IS BOILER PLATE MONGODB CONNECT --> Non boiler plate is await for the DAO files
//

dotenv.config() // configure environment vars 
const MongoClient = mongodb.MongoClient

// "PORT" from the .env file
// process is nodejs.process
const port = process.env.PORT || 8000

// Connect to Database
MongoClient.connect( 
    process.env.RESTREVIEWS_DB_URI,
  {
    maxPoolSize: 50,   // howm any people connecting at a time
    wtimeoutMS: 2500, // request will time out after 2500 ms
    useNewUrlParser: true
  } )
    .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
    .then(async client => {
    
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)

      // start the webserver
    app.listen(port, () => { console.log(`listening on port ${port}`) })
  })