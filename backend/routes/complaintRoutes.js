const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes mapping
router.post('/', authMiddleware, complaintController.createComplaint);
router.get('/', authMiddleware, complaintController.getComplaints);
router.get('/search', authMiddleware, complaintController.searchComplaints);
router.put('/:id', authMiddleware, complaintController.updateComplaint);
router.delete('/:id', authMiddleware, complaintController.deleteComplaint);

module.exports = router;
