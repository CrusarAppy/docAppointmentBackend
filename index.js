const express = require ('express');

const app = express();

const dotenv = require('dotenv');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

dotenv.config();

//import routes
const authRoute =  require('./routes/auth');
//const slotRoute = require('./routes/slots');
const appointmentRoute = require('./routes/appointment');
const doctorRoute = require('./routes/doctors');

//connect to db
mongoose.connect( process.env.DB_CONNECT , 
{useNewUrlParser : true ,
useUnifiedTopology :true },
() => console.log("connected to database")
);


//middleware

app.use(bodyParser.urlencoded({ extended: false }))
 

app.use(bodyParser.json())

//app.use(express.json());

//route middlewares

app.use('/api/user' , authRoute);
//app.use('/api/slot', slotRoute );
app.use('/api/appointments',appointmentRoute);
app.use('/api/doctors' , doctorRoute);

const port = 3005;
app.listen(port , () => console.log( "Server is running and listening to port " ,port ));