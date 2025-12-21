const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  keyComponents: {
    type: String,
    trim: true
  },
  materials: {
    type: String,
    trim: true
  },
  specifications: {
    type: String,
    trim: true
  },
  designFeatures: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  additionalImages: [{
    type: String
  }],
  category: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  subcategory: {
    type: String,
    required: false,
    trim: true
  },
  bulkPricing: [
    {
      minQty: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  customizable: {
    type: Boolean,
    default: false
  },
  colors: [
    {
      type: String,
      trim: true
    }
  ],
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  badge: {
    type: String,
    enum: ['bestseller', 'new', 'sale']
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  ratingCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
