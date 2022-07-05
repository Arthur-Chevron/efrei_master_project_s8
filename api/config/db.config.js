module.exports = dbconf = {
  url: `mongodb+srv://${process.env.USERMONGO}:${process.env.PASSWORDMONGO}@${process.env.CLUSTERNAME}.${process.env.URLMONGOKEY}.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
}
