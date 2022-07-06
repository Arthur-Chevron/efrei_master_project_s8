const db = require("../models/index.js")
const Users = db.Users
const Roles = db.Roles

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")



exports.add = async (req, res) => {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const password = req.body.password
  const birth = req.body.birth
  const email = req.body.email
  const roles = req.body.roles

  if (!firstname) return res.status(400).send({message: "Required parameters firstname is undefined"})
  if (!lastname) return res.status(400).send({message: "Required parameters lastname is undefined"})
  if (!password) return res.status(400).send({message: "Required parameters password is undefined"})
  if (!birth) return res.status(400).send({message: "Required parameters birth is undefined"})
  if (!email) return res.status(400).send({message: "Required parameters email is undefined"})
  if (!roles) return res.status(400).send({message: "Required parameters roles is undefined"})
  // check if roles exist
  if (roles < 1 || roles > 4) return res.status(400).send({message: "Required parameters roles is invalid"})

  try {
    // generate password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    // check if email already exist
    const _users = await Users.findOne({email: email})
    if (_users) return res.status(400).send({message: "Email is already used"})

    // get id of the roles
    const _roles = await Roles.findOne({key: roles}) 
    
    const result = await Users.create({
      firstname: firstname,
      lastname: lastname,
      password: hash,
      birth: birth,
      email: email,
      roles: _roles._id
    })

    // connexion valid generation de l'access token and refresh token
    let payload = { _id: result._id }

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    req.userId = result._id

    return res.status(200).send({
      message: "User created",
      result: result,
      accessToken: accessToken
    })

  } catch(err) {
    return res.status(500).send({err: err})
  }
}

exports.login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email) return res.status(400).send({message: "Required parameters email is undefined"})
  if (!password) return res.status(400).send({message: "Required parameters password is undefined"})

  try {
    // check if user exist
    const isExist = await Users.findOne({email: email})
    if (!isExist) return res.status(400).send({message: "Email is not registered"})

    // check password
    if (!bcrypt.compareSync(password, isExist.password)) return res.status(401).send({message: "Incorrect password"})
    
    // connexion valid generation de l'access token and refresh token
    const payload = { _id: isExist._id }

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    req.userId = isExist._id
    
    // send informations
    res.status(200).send({
        message: "Logged-in user",
        accessToken: accessToken
    })

  } catch(err) {
    return res.status(500).send({err: err})
  }
}

exports.deconnected = async (req, res) => {
  delete req.session
  res.status(200).send({message : 'Disconnected user'})
}

exports.update = async (req, res) => {
  const _id = req.userId
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const birth = req.body.birth
  const email = req.body.email
  let user_ = {}

  // add change to the object user_
  if (firstname !== null && firstname !== '') user_.firstname = firstname
  if (lastname !== null && lastname !== '') user_.lastname = lastname
  if (birth !== null && birth !== '') user_.birth = birth
  if (email !== null && email !== '') user_.email = email

  try {
    const result = await Users.findByIdAndUpdate({_id}, user_)
    if (!result) return res.status(404).send("User doesn't exist")

    if (user_.email) {
      const emailAlreadyUsed = await Users.findOne({email: email})
      if (emailAlreadyUsed) return res.status(400).send("Email already used")
    }

    return res.status(200).send({message: "User succesfully updated", result: result})

  } catch(err) {
    return res.status(500).send({err: err})
  }
}

exports.findAll = async (req, res) => {
  try {
    const allCars = await Cars.find({})
    if (allCars.length === 0) return res.status(200).send("You don't have any car")

    return res.status(200).send({message: "See all your cars", data: allCars})
  } catch(err) {
    return res.status(500).send({message: "Error", err: err})
  }
}


exports.getByToken = async (req, res) => {
  const _id = req.userId

  try {
    const result = await Users.findById({_id: _id})

    if (!result) return res.status(404).send("User doesn't exist")

    return res.status(200).send({message: "See your informations", result: result})

  } catch(err) {
    return res.status(500).send({err: err})
  }
}


/*
exports.add = async (req, res) => {
  const brand = req.body.brand
  const horse_power = req.body.horse_power
  const num_doors = req.body.num_doors
  const model = req.body.model

  if (!brand) return res.status(400).send("Brand is required")
  if (!horse_power) return res.status(400).send("Horse power is required")
  if (!num_doors) return res.status(400).send("Number of doors is required")
  if (!model) return res.status(400).send("Model is required")
  if (horse_power <= 0) return res.status(400).send("Horse power must be greater than 0")
  if (num_doors <= 0) return res.status(400).send("Car must have at least 1 door")

  try {

    const newCar = {
      brand: brand,
      horse_power: horse_power,
      num_doors: num_doors,
      model: model
    }

    const addNewCar = await Cars.create(newCar)
    return res.status(200).send({message: "Add confirm", data: addNewCar})

  } catch (err) {
    return res.status(500).send({message: "Error", err: err})
  }
}*/


exports.deleteACar = async (req, res) => {
  const _id = req.query._id

  if (!_id) return res.status(400).send("_id is required")

  try {
    const deleteCar = await Cars.findOneAndDelete({_id: _id})

    if (!deleteCar) return res.status(404).send("Car doesn't exist")
    return res.status(200).send({message: "Delete your car id : " + _id, data: deleteCar})

  } catch(err) {
    return res.status(500).send({message: "Error", err: err})
  }
}