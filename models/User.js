const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    Fullname : {
        type : String,
        required : true,
        min : 6,
        max :255
    },    
    Username: {
        type : String,
        required : true,
        max : 255,
        min : 4
    }, 
    Address : {
        type : String,
       // required : true
    },  
    PhoneNumber :{
        type : Number,
        //required : true
    },

    Email : {
        type : String,
        required: true,
        max : 255,
        min : 6
    },

    Password : {
        type : String,
        required : true,
        max :1024,
        min : 6
    },
    

    Gender: String,

    DOB : String,

    LicenseNo:{
        type : String,
        //required : true
    },

    Specialization: {
        type : String,
        //required : true
    },
    PanNo : {
        type : String,
        //required : true
    },
   

    
    Type : {
        type: String
    }

});

module.exports = mongoose.model('Users',userSchema );