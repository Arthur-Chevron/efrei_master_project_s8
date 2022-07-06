module.exports = (app) =>{
  const router = require('express').Router()
  const users = require("../controllers/users.controller")
  const { isLogged } = require("../middleware")

  router.post('/', users.add)
  
  router.post('/login', users.login)
  
  router.get('/deconnected', users.deconnected)

  router.put('/', isLogged, users.update)

  router.get('/', isLogged, users.getByToken)

  router.get('/csv', isLogged, users.csv)

  app.use("/users", router)
}
