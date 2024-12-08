const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { title, note } = req.body;
  const datetime = new Date();
  const query = "INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)";
  db.query(query, [title, datetime, note], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, title, note, datetime });
  });
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM notes", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM notes WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(results[0]);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, note } = req.body;
  const datetime = new Date();
  db.query(
    "UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?",
    [title, datetime, note, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.json({ id, title, note, datetime });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM notes WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(204).send();
  });
});

module.exports = router;
