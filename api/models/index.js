const mongoose = require('mongoose')
const dbConfig = require("../config/db.config")
const Users = require("./users.model")
const Difficulties = require("./difficulties.model")
const Links = require("./links.model")
const Medications = require("./medications.model")
const Rappels = require("./rappels.model")
// const Roles = require("./roles.model")

const db = {
    "mongoose": mongoose,
    "url": dbConfig.url,
    "Users": Users(mongoose),
    "Difficulties": Difficulties(mongoose),
    "Links": Links(mongoose),
    "Medications": Medications(mongoose),
    "Rappels": Rappels(mongoose)
    // "Roles": Roles(mongoose)
}

module.exports = db