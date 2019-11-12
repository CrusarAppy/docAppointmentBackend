
const router = require ('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {registerValidation,loginValidation} = require('../validation');

//specific users
router.get('/:userId' , async (req,res) => {
    //console.log(req.params.postId);
    try{
        const user =  await User.findById(req.params.userId);
        res.json(user);
    }catch(err){
        res.json({message: err});

    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                       
})


// get all users
router.get('/' , async (req,res) => {
    //console.log(req.body);
    try{
        const user =  await User.find();
        if(user == 0){
            return res.json({message : 'No users are registered'})
        }else{
            res.json(user);
        }
       
    }catch(err){
        res.status(401).json({message: err});

    }

})

//delete post

router.delete('/:userId' , async (req,res) => {
    //console.log(req.params.postId);
    try{
        const removeUser =  await User.findByIdAndDelete({ _id : req.params.userId });
        res.send("User removed!");
    }catch(err){
        res.json({message: err});

    }

})

router.patch('/:userId' , async (req,res) => {
    //console.log(req.params.postId);
    try{
        const updateUser =  await User.updateOne(
            { _id : req.params.userId },
            {$set : {Fullname : req.body.Fullname}}
            ); 
        res.json(updateUser);
    }catch(err){
        res.json({message: err});

    }

})


router.post('/register' , async(req,res) =>{

    // let's validate the data before we make a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // checking if the user is already in the database

    const emailExist = await User.findOne({Email :req.body.Email});
    if(emailExist) return res.status(400).send('Email already exist');

    //hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password,salt);
    //create a new user
    const user = new User ({
        Fullname :  req.body.Fullname,
        Username: req.body.Username,
        Address : req.body.Address,      
        PhoneNumber :req.body.PhoneNumber,   
        Email : req.body.Email,
        Password :  hashedPassword,
        Type : "User"
       

    });
    try{
        const savedUser = await user.save();
       // res.status(200).send("User is registered!", {user_id : user._id} )
         res.send({user_id : user._id});

    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login' , async(req,res) =>{

    // let's validate the data before we make a user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // checking if the user is in the database

    const user = await User.findOne({Email :req.body.Email});
    if(!user) return res.status(400).send('Email is not found');

    //password is correct 
    const validPass = await bcrypt.compare(req.body.Password,user.Password);
    if(!validPass) return res.status(400).send('Invalid password');
    
    
    router.get('/:userId' , async (req,res) => {
        //console.log(req.params.postId);
        try{
            user =  await User.findById(req.params.userId);
            res.json(user);
        }catch(err){
            res.json({message: err});
    
        }
    
    })
    console.log(user);
    //create and assign a token
    //const token = jwt.sign({_id : user._id ,Type :user.Type}, process.env.TOKEN_SECRET);
    const userinfo = {
        _id : user._id ,Type :user.Type
    }
   // res.header('auth-token', token).send(token);
    res.send(userinfo);
   // return(res.send('logged in!'));
  
});



module.exports = router;