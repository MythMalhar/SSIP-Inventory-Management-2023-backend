import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    default: 'Other',
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  minValue: {
    type: Number,
    required: true,
    default: 0,
  },
  maxValue: {
    type: Number,
    required: true,
    default: 100,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  userId: {
    type: String,
    default: '',
  },
});

const Item = mongoose.model('items', itemSchema);
export default Item;
