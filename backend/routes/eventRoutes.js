const express = require("express");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const jwt = require("jsonwebtoken");

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

router.get("/", getEvents);
router.post("/", auth, createEvent);
router.put("/:id", auth, updateEvent);
router.delete("/:id", auth, deleteEvent);

module.exports = router;
