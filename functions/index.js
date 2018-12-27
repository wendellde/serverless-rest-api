const functions = require("firebase-functions");

const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const main = express();
const contactsRouter = require("./routes/contacts");
const blogsRouter = require("./routes/blogs");

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

main.use("/api/v1/contacts", contactsRouter);
main.use("/api/v1/blogs", blogsRouter);

// webApi is your functions name, and you will pass main as
// a parameter
exports.webApi = functions.https.onRequest(main);
