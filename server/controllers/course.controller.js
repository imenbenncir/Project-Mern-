

const Course = require('../models/course');
const User = require('../models/user.model');

module.exports.bookCourse = async (req, res) => {
    try {
        const { userId } = req.body;
        const courseId = req.params.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has already booked the course
        if (user.bookedCourses.includes(courseId)) {
            return res.status(400).json({ message: 'Course already booked by the user' });
        }

        // Attempt to book the course for the user
        await course.bookCourse(userId);

        // Add course to user's bookedCourses
        user.bookedCourses.push(courseId);
        await user.save();

        // Respond with success message
        res.json({ message: 'Course booked successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

  
  
// Create 
module.exports.createCourse= (req,res)=>{
    Course.create(req.body)
    .then((course)=> res.json(course))
    .catch((err)=> res.json(err))
};

// GET ALL
module.exports.getAllCourse =(req,res)=>{
    Course.find()
    .then((courses)=>res.json(courses))
    .catch((err)=> res.json(err))
};
// GET ONE BY ID

module.exports.getOneCourseById =(req,res)=>{
    Course.findById({_id: req.params.id})
    .then((course)=>res.json(course))
    .catch((err)=> res.json(err))
};

// DELETE

module.exports.deleteOneCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Remove the course from the bookedCourses array of all users
        await User.updateMany(
            { bookedCourses: courseId },
            { $pull: { bookedCourses: courseId } }
        );

        // Delete the course
        await Course.findByIdAndDelete(courseId);

        res.json({ message: 'Course and its bookings removed successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

// UPDATE by iD

module.exports.updateCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const { places, participates } = req.body;

        // Validate that the number of participants does not exceed the available places
        if (participates.length > places) {
            return res.status(400).json({ message: 'The number of participants cannot exceed the available places' });
        }

        Object.assign(course, req.body);
        const updatedCourse = await course.save();

        res.json(updatedCourse);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
};

module.exports.getAvailableCourses = (req, res) => {
    Course.findAvailableCourses()
      .then(courses => res.json(courses))
      .catch(err => res.status(400).json(err));
  };
  
  module.exports.getBookedCourses = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate('bookedCourses');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({ bookedCourses: user.bookedCourses });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  };