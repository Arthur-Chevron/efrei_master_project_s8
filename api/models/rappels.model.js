module.exports = (mongoose) => {
  let schema = mongoose.Schema({
    visual: Boolean,
    sonor: Boolean,
    vibror: Boolean
  })

  return mongoose.model("rappels", schema)
}

