const mongoose = require('mongoose')
const dbConfig = require("../config/db.config")



// difficulties schema
const Links = mongoose.model('Links', new mongoose.Schema({
    link: String
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

// difficulties schema
const Medications = mongoose.model('Medications', new mongoose.Schema(
    {
        name: String,
        duration: Number,
        intervals: Number,
        dose: Number,
        time: Number,
        // time: Number,
        // define _id of the user
        _uid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    }, {
        timestamps: true
    }
))

// difficulties schema
const Rappels = mongoose.model('Rappels', new mongoose.Schema({
    vibror: Number,
    sonor: Number,
    led: Number,
    _uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}))

// difficulties schema
const Difficulties = mongoose.model('Difficulties', new mongoose.Schema({
    name: String,
    _uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}))

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