const mongoose = require("mongoose");

const db = mongoose
  .connect(
    "mongodb+srv://sark:sarik@cluster0.9ao2shy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log("Erro" + error);
    throw new Error("it is not working");
  });

module.exports = db;
