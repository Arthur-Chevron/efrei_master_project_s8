module.exports = (mongoose) => {
  let schema = mongoose.Schema({
    key: Number,
    name: String
  })

  return mongoose.model("roles", schema)
}

