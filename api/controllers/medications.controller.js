const db = require("../models/index.js")
const Medications = db.Medications



exports.add = async (req, res) => {
    const duration = req.body.duration
    const intervals = req.body.intervals
    const dose = req.body.dose
    const time = req.body.time
    const name = req.body.name
    const _uid = req.userId
  
    if (!duration) return res.status(400).send({message: "Required parameters duration is undefined"})
    if (!intervals) return res.status(400).send({message: "Required parameters intervals is undefined"})
    if (!dose) return res.status(400).send({message: "Required parameters dose is undefined"})
    if (!name) return res.status(400).send({message: "Required parameters name is undefined"})
    if (!time) return res.status(400).send({message: "Required parameters time is undefined"})

    if (duration <= 0) return res.status(400).send({message: "Parameters duration is invalid"})
    if (intervals <= 0) return res.status(400).send({message: "Parameters intervals is invalid"})
    if (dose <= 0) return res.status(400).send({message: "Parameters dose is invalid"})
    if (time < 0 && time >= 24) return res.status(400).send({message: "Parameters time is invalid"})

    try {
        const result = await Medications.create({
            name,
            duration,
            intervals,
            dose,
            time,
            _uid
        })

        return res.status(200).send({message: "Medicament created", result: result})

    } catch(err) {
        return res.status(500).send({err: err})
    }
}

exports.put = async (req, res) => {
    const _id = req.body._id
    const duration = req.body.duration
    const name = req.body.name
    const dose = req.body.dose
    const intervals = req.body.intervals
    const time = req.body.time
    const _uid = req.userId
    let medications_ = {}

    if (!_id) return res.status(400).send({message: "Required parameters _id is undefined"}) 
  
    // add change to the object user_
    if (duration !== null && duration !== '') medications_.duration = duration
    if (dose !== null && dose !== '') medications_.dose = dose
    if (intervals !== null && intervals !== '') medications_.intervals = intervals
    if (name !== null && name !== '') medications_.name = name
    if (time !== null && time !== '') medications_.time = time

    if (duration <= 0) return res.status(400).send({message: "Parameters duration is invalid"})
    if (intervals <= 0) return res.status(400).send({message: "Parameters intervals is invalid"})
    if (dose <= 0) return res.status(400).send({message: "Parameters dose is invalid"})
    if (time < 0 && time >= 24) return res.status(400).send({message: "Parameters time is invalid"})
  
    try {
        const haveRight = await Medications.findOne({_uid: _uid, _id: _id})
        if (!haveRight) return res.status(401).send({message: "Is not your medicament"})

        const result = await Medications.findByIdAndUpdate({_id}, medications_)
        if (!result) return res.status(404).send({message: "Medications doesn't exist"})
    
        return res.status(200).send({message: "Medications succesfully updated", result: result})
  
    } catch(err) {
      return res.status(500).send({err: err})
    }
}

exports.delete = async (req, res) => {
    const _id = req.query._id

    if (!_id) return res.status(400).send({message: "Required parameters _id is undefined"})

    try {
        const result = await Medications.findByIdAndDelete({_id})

        if (!result) return res.status(404).send({message: "Medicament doesn't exist"})
        return res.status(200).send({message: "Medicament deleted", result: result})

    } catch(err) {
        return res.status(500).send({err: err})
    }
}