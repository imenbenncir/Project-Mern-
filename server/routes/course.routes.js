const CourseController= require('../controllers/course.controller');


module.exports = app => {
    app.get("/api/courses", CourseController.getAllCourse);
    app.get("/api/courses/:id", CourseController.getOneCourseById);
    app.patch("/api/courses/:id", CourseController.updateCourseById);
    app.post("/api/courses", CourseController.createCourse);
    app.delete("/api/courses/:id", CourseController.deleteOneCourse);
    app.post('/api/courses/:id/book', CourseController.bookCourse);
    app.get('/api/available-courses', CourseController.getAvailableCourses);

};
