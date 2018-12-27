const express = require("express");
const contactsRouter = express.Router();
const firebaseHelper = require("firebase-functions-helper");
const admin = require("firebase-admin");
const db = admin.firestore();

const contactsCollection = "contacts";

// Add new contact
contactsRouter.post("/", (req, res) => {
  firebaseHelper.firestore.createNewDocument(db, contactsCollection, req.body);
  res.send("Create a new contact");
});
// Update new contact
contactsRouter.patch("/:contactId", (req, res) => {
  firebaseHelper.firestore.updateDocument(
    db,
    contactsCollection,
    req.params.contactId,
    req.body
  );
  res.send("Update a new contact");
});
// View a contact
contactsRouter.get("/:contactId", (req, res) => {
  firebaseHelper.firestore
    .getDocument(db, contactsCollection, req.params.contactId)
    .then(doc => res.status(200).send(doc));
});
// View all contacts
contactsRouter.get("/", (req, res) => {
  firebaseHelper.firestore
    .backup(db, contactsCollection)
    .then(data => res.status(200).send(data));
});
// Delete a contact
contactsRouter.delete("/:contactId", (req, res) => {
  firebaseHelper.firestore.deleteDocument(
    db,
    contactsCollection,
    req.params.contactId
  );
  res.send("Document deleted");
});

module.exports = contactsRouter;
