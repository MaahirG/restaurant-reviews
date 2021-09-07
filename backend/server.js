import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js" // routes in a separate file

// Init Express Webapp framework
const app = express()

// Modules express will use
app.use(cors())
app.use(express.json()) // server can accept json in body of a http request sent to server

// initial routes
// every route in browser must start with: /api/v1/restaurants, else 404 error 
app.use("/api/v1/restaurants", restaurants) // URL people go to, routes are in the restaurants file
app.use("*", (req, res) => res.status(404).json({ error: "not found"})) // person went to unsupported route

export default app // can then import from the database code
