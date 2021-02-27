const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      require: [true, 'Set email for contact'],
      unique: true,
    },
    phone: {
      type: String,
      require: [true, 'Set phone for contact'],
    },
  },
  { versionKey: false, timestamps: true },
)

const Contact = model('contact', contactSchema)

module.exports = Contact
