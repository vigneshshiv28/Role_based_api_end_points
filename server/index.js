//Importing Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


//Importing Routes
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');

//Configurations
dotenv.config({path:__dirname+'/.env'});
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true }));
app.use(bodyParser.json({limit: "30mb" , extended: true}));

//Routes
app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);


//Mongoose Connection

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Server Port: ${process.env.PORT}`));
    })
    .catch((error) => {
        console.log(`${error} did not connect`);
    });
