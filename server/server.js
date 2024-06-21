const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const cookieParser = require('cookie-parser');
const solarPanelRoutes = require('./routes/solarPanelRoutes');


// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Specify the extended option
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

// grab the config
require("./config/mongoose.config");

// GRAB THE ROUTEs
require("./routes/course.routes")(app);
require('./routes/user.routes')(app);
require("./routes/message.routes")(app);
app.use('/api/solar-panel', solarPanelRoutes);



app.listen(port, () => {
    console.log("Listening to port " + port);
});
