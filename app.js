const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");
const notesRoutes = require("./routes/notes");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/notes", notesRoutes);
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
