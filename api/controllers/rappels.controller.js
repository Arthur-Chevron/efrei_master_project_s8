const db = require('../models/index')
const Rappels = db.Rappels

exports.put = async (req, res) => {
    const sonor = req.body.sonor
    const vibror = req.body.vibror
    const led = req.body.led
    const _uid = req.userId
    let rappels_ = {}
  
    // add change to the object user_
    if (sonor !== null && sonor !== 0 && sonor !== 1) rappels_.sonor = parseInt(sonor)
    if (vibror !== null && vibror !== 0 && vibror !== 1) rappels_.vibror = parseInt(vibror)
    if (led !== null && led !== 0 && led !== 1) rappels_.led = parseInt(led)
  
    try {
        const result = await Rappels.findOneAndUpdate({_uid: _uid}, rappels_)
        if (!result) return res.status(404).send({message: "Rappels doesn't exist"})
    
        return res.status(200).send({message: "Rappels succesfully updated", result: result})
  
    } catch(err) {
      return res.status(500).send({err: err})
    }
}