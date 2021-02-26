// const db = require('./db')
// const { ObjectID } = require('mongodb')
const Contact = require('./schemas/contact')
// const getCollection = async (db, name) => {
//   const client = await db
//   const collection = await client.db().collection(name)
//   return collection
// }
const listContacts = async () => {
  // const collection = await getCollection(db, 'contacts')
  // const results = await collection.find({}).toArray()
  // return results
  const results = await Contact.find({})
  return results
}

const getContactById = async id => {
  // const collection = await getCollection(db, 'contacts')
  // const objectId = new ObjectID(id)
  // const [result] = await collection.find({ _id: objectId }).toArray()
  // return result
  const result = await Contact.findOne({ _id: id })
  return result
}

const removeContact = async id => {
  // const collection = await getCollection(db, 'contacts')
  // const objectId = new ObjectID(id)
  // const { value: result } = await collection.findOneAndDelete({ _id: objectId })
  // return result

  const result = await Contact.findByIdAndDelete({ _id: id })
  return result
}

const addContact = async body => {
  // const record = {
  //   ...body,
  // }
  // const collection = await getCollection(db, 'contacts')
  // const {
  //   ops: [result],
  // } = await collection.insertOne(record)
  // return result
  const result = await Contact.create(body)
  return result
}

const updateContact = async (id, body) => {
  // const collection = await getCollection(db, 'contacts')
  // const objectId = new ObjectID(id)
  // const { value: result } = await collection.findOneAndUpdate(
  //   { _id: objectId },
  //   { $set: body },
  //   { returnOriginal: false },
  // )
  // return result
  const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
