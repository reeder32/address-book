// Business Logic for Address Book -------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
}

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function (id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
}

AddressBook.prototype.deleteContact = function (id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}

AddressBook.prototype.updateContact = function (contact) {

  // first look up in contacts by the contact.id property
  // example: contact.firstName used to be "Ada", now it's "Steve", but since id is same, it will reassign Ada to Steve.
  if (this.contacts[contact.id] === undefined) {
    // if it doesn't exist, return false
    return false;
  }
  // if it does exist, 
  //we will reassign the object at key contact.id back to the contact with its new properties
  // this will work, because the contact that is being passed as an arguement has the same id, and it is unique.
  this.contacts[contact.id] = contact;

}

// Business Logic for Contacts ----------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName
  this.lastName = lastName
  this.phoneNumber = phoneNumber
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

let testContact = new Contact("Ada", "Lovelace", "503-555-1111");
//console.log(testContact.fullName());

