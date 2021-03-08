const mongoose = require('mongoose')
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
mongoose.connection.on('connected', () => {
  console.log(`Mongoost connection to db`)
})
mongoose.connection.on('error', err => {
  console.log(`Mongoost connection error: ${err.messege}`)
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongoost disconnected')
})
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(1)
})
module.exports = db
