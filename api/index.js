const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const dbConfig = require("./config/db.config")

const app = express()

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({ secret: 'grehjznejzkhgjrez', saveUninitialized: false, resave: false }))

app.use(cors(
    {
      "origin": "*"
    }
))

require("./routes/users.route")(app)
require("./routes/medications.route")(app)
require("./routes/rappels.route")(app)
require("./routes/difficulties.route")(app)

mongoose.connect(dbConfig.url, {})
  .then(console.log("connected succed"))
  .catch(err => { console.log("connection failed", err)})

app.listen(8085, () => { console.log("application running on port 8085") })

