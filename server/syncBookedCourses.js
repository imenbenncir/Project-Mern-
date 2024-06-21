const mongoose = require('mongoose');
const Course = require('./models/course'); // Adjust the path as necessary
const User = require('./models/user.model'); // Adjust the path as necessary

const syncBookedCourses = async () => {
    try {
        await mongoose.connect(`mongodb+srv://root:root@cluster0.itl2tyy.mongodb.net/voltaique?retryWrites=true&w=majority&appName=Cluster0`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("the connection with database succesfully")

        const courses = await Course.find().populate('participates');
        for (const course of courses) {
            for (const user of course.participates) {
                await User.findByIdAndUpdate(
                    user._id,
                    { $addToSet: { bookedCourses: course._id } }
                );
            }
        }

        console.log('Synchronization completed successfully');
    } catch (err) {
        console.error('Error during synchronization:', err);
    } finally {
        mongoose.connection.close();
    }
};

syncBookedCourses();
