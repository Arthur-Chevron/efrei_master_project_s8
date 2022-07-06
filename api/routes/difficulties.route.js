module.exports = (app) =>{
    const router = require('express').Router()
    const difficulties = require("../controllers/difficulties.controller")
    const { isLogged } = require("../middleware")
  
    router.post('/', isLogged, difficulties.add)
  
    router.put('/', isLogged, difficulties.put)
  
    router.delete('/', isLogged, difficulties.delete)
  
    app.use("/difficulties", router)
  }
  