
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

  if (this.contacts[contact.id] === undefined) {
    return false;
  }
  this.contacts[contact.id] = contact;

}

// Business Logic for Contacts ----------
function Contact(firstName, lastName, phoneNumber, emailAddresses, address) {
  this.firstName = firstName
  this.lastName = lastName
  this.phoneNumber = phoneNumber
  this.emailAddresses = emailAddresses
  this.address = address
}

function Email(address, type) {
  this.address = address
  this.type = type
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

// User interface logic

let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";

  Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
    contactsList.html(htmlForContactInfo);
  });

}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".address").html(contact.address);
  contact.emailAddresses.forEach(function (email) {
    console.log(email);
    if (email.address) {
      $(".email-addresses").append("<li>" + email.address + " : " + email.type + "</li>")
    }
  });
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail1 = new Email($("input#new-email1").val(), $("#email-address1-types option:selected").text());
    const inputtedEmail2 = new Email($("input#new-email2").val(), $("#email-address2-types option:selected").text());
    const inputtedEmail3 = new Email($("input#new-email3").val(), $("#email-address3-types option:selected").text());
    const emailAddresses = [inputtedEmail1, inputtedEmail2, inputtedEmail3];
    const inputtedAddress = $("input#new-address").val();
    let newContact = new Contact(
      inputtedFirstName,
      inputtedLastName,
      inputtedPhoneNumber,
      emailAddresses,
      inputtedAddress);
    if (newContact) {
      $("input#new-first-name").val("");
      $("input#new-last-name").val("");
      $("input#new-phone-number").val("");
      $("input#new-email1").val("");
      $("input#new-email2").val("");
      $("input#new-email3").val("");
      $("input#new-address").val("");
      addressBook.addContact(newContact);
    }
    displayContactDetails(addressBook);
    event.preventDefault();
  });
});