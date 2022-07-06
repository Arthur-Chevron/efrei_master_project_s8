module.exports = (app) =>{
    const router = require('express').Router()
    const rappels = require("../controllers/rappels.controller")
    const { isLogged } = require("../middleware")
  
    router.put('/', isLogged, rappels.put)
  
    app.use("/rappels", router)
  }
  