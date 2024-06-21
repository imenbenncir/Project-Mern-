const {register, login, logout, getLoggedUser,updateExistinguser, deleteUser, registerAdmin, getAllUsers, getUserById} = require('../controllers/user.controller')
const courseController = require('../controllers/course.controller');

module.exports = app => {
    app.post ('/api/register', register)
    app.post ('/api/admin/register', registerAdmin)
    app.post ('/api/login', login)
    app.post ('/api/logout', logout)
    app.get ('/api/user', getLoggedUser)
    app.delete ('/api/user/:id',deleteUser )
    app.get ('/api/users', getAllUsers)
    app.get ('/api/user/:id', getUserById)
    app.get('/user/:userId/booked-courses', courseController.getBookedCourses);
    
    app.patch("/api/users/:id", updateExistinguser)}
