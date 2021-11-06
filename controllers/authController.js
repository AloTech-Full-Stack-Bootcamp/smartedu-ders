const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.createUser = async (req, res) => {
    const user = await User.create(req.body);
    
    res.status(201).json({user: user});
}


exports.loginUser = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user){
        bcrypt.compare(req.body.password, user.password, (err, same)=>{
            if(same){
                req.session.userId = user._id;
                res.redirect('/');
            }else{
                res.status(400).json({"Hata" : "Wrong pass."});
            }
        });
    }else{
        res.status(400).json({"Hata" : "User not found."});

    }

}


exports.logoutUser = async (req, res) => {
    req.session.destroy(()=> {
        res.redirect('/');
    });
    
    res.status(201).json({user: user});
}