import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  phaseDuration: {
    type: Number,
    required: true,
  },
  phase: {
    type: String,
    required: true,
    default: 'employee',
  },
});

const Plan = mongoose.model('plans', planSchema);
export default Plan;
