const Event_schema = require("../models/Event_Schema");


const getEvent = async (req, res) => {
  try {
    const data = await Event_schema.find().sort({ date: 1 }); 
    return res.status(200).json({
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    console.error(" Error fetching events:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const geteventbyid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const data = await Event_schema.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({
      message: "Event fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const createEvent = async (req, res) => {
  try {
    const { title, description, location, date, maxParticipants, currentParticipants } = req.body;


    if (!title || !description || !location || !date || !maxParticipants) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }


    const data = new Event_schema({
      title,
      description,
      location,
      date,
      maxParticipants,
      currentParticipants: currentParticipants || 0,
    });

    await data.save();

    return res.status(201).json({
      message: "Event created successfully",
      data,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getEvent, geteventbyid, createEvent };
