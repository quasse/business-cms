const express = require("express");
const db = require("./db/connection");

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Default response for any request outside of an API request (Not found)
app.use((req, res) => {
  res.status(404).end();
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
