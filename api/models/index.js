const mongoose = require('mongoose')
const dbConfig = require("../config/db.config")

// difficulties schema
const Difficulties = mongoose.model('Difficulties', new mongoose.Schema({
    key: Number,
    name: String
}))

// difficulties schema
const Links = mongoose.model('Links', new mongoose.Schema({
    link: String
}))

// difficulties schema
const Medications = mongoose.model('Medications', new mongoose.Schema(
    {
        duration: Date,
        intervals: Date,
        dose: Number,
        time: Date
    }, {
        timestamps: true
    }
))

// difficulties schema
const Rappels = mongoose.model('Rappels', new mongoose.Schema({
    key: Number,
    name: String
}))

// difficulties schema
const Roles = mongoose.model('Roles', new mongoose.Schema({
    key: Number,
    name: String
}))

// users schema
const Users = mongoose.model('Users', new mongoose.Schema({
    firstname: String,
    lastname: String,
    password : String,
    birth: Date,
    email: String,
    // define roles of the user
    roles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles'
    }
}))

// some functions
async function createRoles(key, name) {
    const roles = new Roles({
        key,
        name
    })

    const result = await roles.save();
    console.log(result);
}

/*createRoles(1, "Malade")
createRoles(2, "Famille")
createRoles(3, "Amis")
createRoles(4, "Professionnels de santé")*/

const db = {
    "mongoose": mongoose,
    "url": dbConfig.url,
    "Users": Users,
    "Difficulties": Difficulties,
    "Links": Links,
    "Medications": Medications,
    "Rappels": Rappels,
    "Roles": Roles
}

module.exports = db