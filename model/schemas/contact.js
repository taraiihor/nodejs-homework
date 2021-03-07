const { Schema, model, SchemaTypes } = require('mongoose')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, 'Set name for contact'],
      unique: true,
    },
    email: {
      type: String,
      require: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      require: [true, 'Set phone for contact'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
)

const Contact = model('contact', contactSchema)

module.exports = Contact
