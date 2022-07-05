module.exports = (mongoose) => {
  let schema = mongoose.Schema({
    duration: Date,
    intervals: Date,
    dose: Number,
    time: Date
  }, {
    timestamps: true
  })

  return mongoose.model("medications", schema)
}

