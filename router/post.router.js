const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

// Create
// POST http://localhost:5000/api/v1/post/
router.post("/", postController.createPost);

// Get all
// GET http://localhost:5000/api/v1/post/
router.get("/", postController.getPost);

// Get post by id
// GET http://localhost:5000/api/v1/post/1
router.get("/:id", postController.getById);

// Get post by AuthorId
// GET http://localhost:5000/api/v1/post/author/1
router.get("/author/:id", postController.getByAuthorId);    

// // Upadate
// // http://localhost:5000/api/v1/post/author/4
// router.put("/author/:id", postController.getByAuthorId);

// // delete
// // http://localhost:5000/api/v1/post/author/4
// router.delete("/author/:id", postController.getByAuthorId);


module.exports = router;