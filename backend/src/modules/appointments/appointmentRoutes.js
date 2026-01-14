import express from 'express';
import appointmentModel from './appointmentModel.js';

const router = express.Router();

// Get all appointments
router.get('/', (req, res) => {
  try {
    const appointments = appointmentModel.getAll();
    res.json({
      success: true,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get appointment by ID
router.get('/:id', (req, res) => {
  try {
    const appointment = appointmentModel.getById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create new appointment
router.post('/', (req, res) => {
  try {
    const appointment = appointmentModel.create(req.body);
    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update appointment
router.put('/:id', (req, res) => {
  try {
    const appointment = appointmentModel.update(req.params.id, req.body);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update appointment status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }

    const appointment = appointmentModel.updateStatus(req.params.id, status);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }
    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete appointment
router.delete('/:id', (req, res) => {
  try {
    appointmentModel.delete(req.params.id);
    res.json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
