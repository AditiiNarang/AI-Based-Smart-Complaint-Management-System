const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Pending, In Progress, Resolved
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
