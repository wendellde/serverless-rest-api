const express = require("express");
const blogsRouter = express.Router();
const firebaseHelper = require("firebase-functions-helper");
const admin = require("firebase-admin");
const db = admin.firestore();

const blogsCollection = "blogs";

// Add new blog
blogsRouter.post("/", (req, res) => {
  firebaseHelper.firestore.createNewDocument(db, blogsCollection, req.body);
  res.send("Blog Post Created");
});
// Update blog by id
blogsRouter.patch("/:blogId", (req, res) => {
  firebaseHelper.firestore.updateDocument(
    db,
    blogsCollection,
    req.params.blogId,
    req.body
  );
  res.send("Blog Updated");
});
// View blog by id
blogsRouter.get("/:blogId", (req, res) => {
  firebaseHelper.firestore
    .getDocument(db, blogsCollection, req.params.blogId)
    .then(doc => res.status(200).send(doc));
});
// View all blogs
blogsRouter.get("/", (req, res) => {
  firebaseHelper.firestore
    .backup(db, blogsCollection)
    .then(data => res.status(200).send(data));
});
// Delete a blog
blogsRouter.delete("/:blogId", (req, res) => {
  firebaseHelper.firestore.deleteDocument(
    db,
    blogsCollection,
    req.params.blogId
  );
  res.send("Document deleted");
});

module.exports = blogsRouter;
