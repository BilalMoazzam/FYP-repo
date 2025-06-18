  const mongoose = require('mongoose');

  const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name cannot exceed 50 characters']
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot exceed 200 characters']
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    },
    level: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    image: {
      type: String,
      default: ''
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }, {
    timestamps: true
  });

  // Virtual for subcategories
  categorySchema.virtual('subcategories', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parent'
  });

  module.exports = mongoose.model('Category', categorySchema);