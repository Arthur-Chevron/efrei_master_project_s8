const jwt = require('jsonwebtoken')
const db = require("./models")
const Users = db.Users

exports.isLogged = async (req, res, next) => {
    let accessToken = req.headers.authorization 

    if (!!accessToken && accessToken.startsWith('Bearer ')) accessToken = accessToken.slice(7, accessToken.length)
    if (!accessToken) return res.status(403).send("Cannot find token")

    try {
        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        // check if user exist
        const isExist = await Users.findOne({_id: payload._id})
        if (!isExist) return res.status(400).send({message: "Email is not registered"})

        req.userId = payload._id
        
        // do the next things in the thread
        return next()

    } catch(err) {
        if (err.name === 'TokenExpiredError') return res.status(401).send({message : "Token is expired"})
        else return res.status(401).send({message : "Access denied"})
    }
}