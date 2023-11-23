import mongoose from 'mongoose';

const planningOrderSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
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
  },
  imageUrl: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
});

const planningBulkOrderSchema = new mongoose.Schema(
  {
    planningOrders: [planningOrderSchema],
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
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
  },
  imageUrl: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  delivered: {
    type: Number,
    required: true,
    default: 0,
  },
  masterPassword: {
    type: String,
    required: true,
    default: 'none',
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
  },
});

const bulkOrderSchema = new mongoose.Schema(
  {
    orders: [orderSchema],
  },
  { timestamps: true }
);

const inventorySchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
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
    },
    imageUrl: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    subBranch: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    profileIcon: {
      type: String,
      default: '',
    },
    bulkOrders: [bulkOrderSchema],
    planningBulkOrders: {
      type: planningBulkOrderSchema,
    },
    inventory: [inventorySchema],
  },
  { timestamps: true }
);

const User = mongoose.model('users', userSchema);

export default User;
