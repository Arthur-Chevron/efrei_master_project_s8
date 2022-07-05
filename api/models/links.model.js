module.exports = (mongoose) => {
  let schema = mongoose.Schema({
    link: String
  })

  return mongoose.model("links", schema)
}

