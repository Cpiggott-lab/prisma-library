// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const bookRoutes = require("./routes/book.routes"); // <== ADD
app.use("/api", bookRoutes); // <== ADD

const authorRoutes = require("./routes/author.routes"); // <== ADD
app.use("/api", authorRoutes); // <== ADD
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
