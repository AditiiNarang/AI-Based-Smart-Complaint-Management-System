const Complaint = require('../models/Complaint');

// Create a complaint
exports.createComplaint = async (req, res) => {
  try {
    const { name, email, title, description, category, location } = req.body;
    const newComplaint = new Complaint({
      name,
      email,
      title,
      description,
      category,
      location,
    });
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Error creating complaint', error: error.message });
  }
};

// Get all complaints
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error: error.message });
  }
};

// Update complaint status
exports.updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedComplaint) return res.status(404).json({ message: 'Complaint not found' });
    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Error updating complaint', error: error.message });
  }
};

// Delete a complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    if (!deletedComplaint) return res.status(404).json({ message: 'Complaint not found' });
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting complaint', error: error.message });
  }
};

// Search complaints
exports.searchComplaints = async (req, res) => {
  try {
    const { location, category } = req.query;
    let query = {};
    if (location) query.location = { $regex: location, $options: 'i' };
    if (category) query.category = { $regex: category, $options: 'i' };

    const complaints = await Complaint.find(query);
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error searching complaints', error: error.message });
  }
};
