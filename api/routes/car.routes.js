module.exports = (app) =>{
  const router = require('express').Router()
  const users = require("../controllers/users.controller")


   app.use("/users", router)
}
