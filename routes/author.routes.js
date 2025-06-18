// routes/author.routes.js

const express = require("express");
const router = express.Router();

const prisma = require("../db/index");

//  POST /api/authors  -  Creates a new author
router.post("/authors", (req, res, next) => {
  const { firstName, lastName, bio } = req.body;

  const newAuthor = {
    firstName,
    lastName,
    bio,
  };

  prisma.author
    .create({ data: newAuthor })
    .then((author) => {
      console.log("New author created", author);
      res.status(201).json(author);
    })
    .catch((err) => {
      console.log("Error creating new author", err);
      res.status(500).json({ message: "Error creating new author" });
    });
});

router.get("/authors", (req, res, next) => {
  prisma.author
    .findMany({ include: { books: true } }) // Include books related to the author
    .then((allAuthors) => {
      res.json(allAuthors);
    })
    .catch((err) => {
      console.log("Error getting authors from DB", err);
      res.status(500).json({ message: "Error getting authors from DB" });
    });
});

module.exports = router;
