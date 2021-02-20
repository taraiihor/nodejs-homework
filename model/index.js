// const fs = require('fs/promises')
// const path = require('path');
// const contactsPath = path.resolve('model/contacts.json');

const db = require('./db')
const {v4: uuidv4} = require('uuid')

const listContacts = async () => {
  // try {
  //   const data = await fs.readFile(contactsPath, 'utf8');
  //   const result = JSON.parse(data);
  //   return result;
  // } catch (error) {
  //   console.log(error);
  // }
  return db.get('contacts').value()
}

const getContactById = async (id) => {
  // try {
  //   const data = await fs.readFile(contactsPath, 'utf8');
  //   const result = JSON.parse(data).find(contact => contact.id.toString() === id);
  //   return result;
  // } catch (error) {
  //   console.log(error);
  // }
  return db.get('contacts').find({ id }).value()
}

const removeContact = async (id) => {
  // try {
  //   const data = await fs.readFile(contactsPath, 'utf8');
  //   const result = JSON.parse(data).filter(contact => contact.id !== id);
  //   let deletedContact = {};

  // const newContacts = result.filter((contact) => {
  //   if (contact.id.toString() === id) {
  //     deletedContact = {
  //       ...contact,
  //     };
  //     return false;
  //   } else {
  //     return true;
  //   }
    
  // });
  // await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  
  // return deletedContact;

  // } catch (error) {
  //   console.log(error);
  // }

  const [record] = db.get('contacts').remove({ id }).write()
  return record
}

const addContact = async (body) => {
  // try {
  //   const data = await fs.readFile(contactsPath, 'utf8');
  //   const result = JSON.parse(data);
  //   const newContact = {id: uuidv4(), ...body };
  //   const updateContact = [...result, newContact];
  //   await fs.writeFile(contactsPath, JSON.stringify(updateContact));
  //   return newContact
  // } catch (error) {
  //   console.log(error);
  // }
  const id = uuidv4()
  const record = {
    id,
    ... body,    
  }
  db.get('contacts').push(record).write()
  return record
}

const updateContact = async (id, body) => {
  // const data = await fs.readFile(contactsPath, 'utf8');
  // const result = JSON.parse(data);
  // let newContact = {};

  // const updateContacts = result.map((contact) => {
  //   if (contact.id.toString() === id) {
  //     newContact = {
  //       ...contact,
  //       ...body,
  //     };

  //     return newContact;
  //   } else {
  //     return contact;
  //   }
  // });

  // await fs.writeFile(contactsPath, JSON.stringify(updateContacts), (err) =>
  //   console.log(err)
  // );

  // return updateContacts;
  const record = db.get('contacts').find({ id }).assign(body).value()
  db.write()
  return record.id ? record : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
