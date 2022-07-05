module.exports = (mongoose) => {
  let schema = mongoose.Schema({
    firtsname: String,
    lastname: String,
    password : String,
    birth: Date,
  
    // relation with roles
    roles: {
      type: new mongoose.Schema({
        key: Number,
        name: String
      })
    } 
  })

  return mongoose.model("users", schema)
}