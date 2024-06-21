const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title must be present.'],
    minlength: [3, 'Title must be at least 3 characters.'],
    trim: true
  },
  instructor: {
    type: String,
    required: [true, 'Instructor must be present.']
  },
  details: {
    type: String,
    minlength: [10, 'Details must be at least 10 characters.']
  },
  plan: [{
    date: { type: String, required: true },
    time: { type: String, required: true }
  }],
  places: {
    type: Number,
    required: [true, 'Set the available places']
  },
  participates: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    validate: [{
      validator: function(value) {
        return value.length <= this.places;
      },
      message: 'The number of participants cannot exceed the available places'
    }]
  }
}, { timestamps: true });

// Static method to find courses with available places and the number of available places
courseSchema.statics.findAvailableCourses = function() {
  return this.aggregate([
    {
      $addFields: {
        availablePlaces: { $subtract: ["$places", { $size: "$participates" }] }
      }
    },
    {
      $match: {
        availablePlaces: { $gt: 0 }
      }
    },
    {
      $project: {
        title: 1,
        instructor: 1,
        details: 1,
        plan: 1,
        places: 1,
        participates: 1,
        availablePlaces: 1
      }
    }
  ]);
};

// Method to handle booking a course for a user
courseSchema.methods.bookCourse = async function(userId) {
  if (this.participates.includes(userId)) {
    throw new Error('You are already booked this course');
  }
  if (this.participates.length >= this.places) {
    throw new Error('No available places');
  }
  this.participates.push(userId);
  await this.save();
};

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
