const Event = require("../models/Event");

exports.getEvents = async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
};

exports.createEvent = async (req, res) => {
  const event = await Event.create({ ...req.body, createdBy: req.userId });
  res.status(201).json(event);
};

exports.updateEvent = async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
};
