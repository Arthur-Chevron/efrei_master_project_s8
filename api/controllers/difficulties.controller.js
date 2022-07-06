const db = require("../models/index.js")
const Difficulties = db.Difficulties



exports.add = async (req, res) => {
    const name = req.body.name
    const _uid = req.userId
  
    if (!name) return res.status(400).send({message: "Required parameters name is undefined"})

    try {
        const result = await Difficulties.create({
            name,
            _uid
        })

        return res.status(200).send({message: "Difficulties created", result: result})

    } catch(err) {
        return res.status(500).send({err: err})
    }
}

exports.put = async (req, res) => {
    const _id = req.body._id
    const name = req.body.name
    const _uid = req.userId
    let difficulties_ = {}

    if (!_id) return res.status(400).send({message: "Required parameters _id is undefined"}) 
  
    if (name !== null && name !== '') difficulties_.name = name
  
    try {
        const haveRight = await Difficulties.findOne({_uid: _uid, _id: _id})
        if (!haveRight) return res.status(401).send({message: "Is not your difficulties"})

        const result = await Difficulties.findByIdAndUpdate({_id}, difficulties_)
        if (!result) return res.status(404).send({message: "Difficulties doesn't exist"})
    
        return res.status(200).send({message: "Difficulties succesfully updated", result: result})
  
    } catch(err) {
      return res.status(500).send({err: err})
    }
}

exports.delete = async (req, res) => {
    const _id = req.query._id

    if (!_id) return res.status(400).send({message: "Required parameters _id is undefined"})

    try {
        const result = await Difficulties.findByIdAndDelete({_id})

        if (!result) return res.status(404).send({message: "Difficulty doesn't exist"})
        return res.status(200).send({message: "Difficulty deleted", result: result})

    } catch(err) {
        return res.status(500).send({err: err})
    }
}