module.exports = (app) =>{
  const router = require('express').Router()
  const medications = require("../controllers/medications.controller")
  const { isLogged } = require("../middleware")

  router.post('/', isLogged, medications.add)

  router.put('/', isLogged, medications.put)

  router.delete('/', isLogged, medications.delete)

  app.use("/medications", router)
}
