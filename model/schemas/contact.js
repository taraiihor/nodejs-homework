const { Schema, model, SchemaTypes } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

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

contactSchema.plugin(mongoosePaginate)
const Contact = model('contact', contactSchema)

module.exports = Contact
