const User = require('../models/User');
const config = require("../config/auth.config");
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const mailer = require('../utils/mailer');

exports.registerUser = (req,res) => {
    try {
      console.log("REGISTRATION REQUEST CAME");
      console.log(req.body);
        const userObj ={
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phone: req.body.phone,  
            password: bcrypt.hashSync(req.body.password, 8),
          };
        
        if(req.body.status) {
            // ADDING IT AS A NEW TYPE
            userObj.status = req.body.status;
        };

        const user = new User(userObj);
      
        user.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
      
          if (req.body.roles) {
           
            Role.find(
              {
                _id: { $in: req.body.roles },
              },
              (err, roles) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
            
                user.roles = roles.map((role) => role._id);
                user.save((err) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                  
                  res.status(201).send({
                    message:
                      "User was registered successfully!",
                  });
                 
                });
              }
            );
          } else {
            // If no role was selected then we want to make the user a general manager by default
            Role.findOne({ name: "gmanager" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
      
              user.roles = [role._id];
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                res.send({
                  message:
                    "User was registered successfully! Please check your email",
                });
              });
            });
          }
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: "There was an error trying to signup"})
    }
}

exports.completeAccount = async (req,res) =>{
  try {
    const userObj ={
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
      status: req.body.status,
      password: bcrypt.hashSync(req.body.password, 8),
      confirmationCode: null
    };

    let token = req.params.token;

    await User.updateOne(
      {
        "confirmationCode": token
      },
      {
        $set: userObj
      }
    );
    
    return res.status(200).send({message: "User Account Good"});

  } catch (error) {
    return res.status(500).send({message: "There was an error"});
  }
}

exports.login = (req,res) => {
  try {
    User.findOne({
      email: req.body.email,
    }).populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
  
        if (user.status != "Active") {
          return res.status(401).send({
            message: "Pending Account. Please Complete Your Registration",
          });
        }
       
        var token = jwt.sign({ id: user._id, email: user.email }, config.secret, {
          expiresIn: 86400, // 24 hours
        });
        
     
        var authorities = [];
  
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user._id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          phone: user.phone,
          roles: authorities,
          accessToken: token,
          status: user.status,
        });
      });
  } catch (error) {
    return res.status(500).send({message: "There was an error", error: error});
  }
}



exports.addUser = (req,res) => {
  try {
      console.log("REQUEST GOT HERE");
      let email = req.body.email;
      let status = 'Pending';
      const confirm = jwt.sign({ email: req.body.email }, config.secret);
      let user1 = {email: email, status: status, confirmationCode: confirm}
      
      Role.find(
          {
            _id: { $in: req.body.roles },
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
        
            user1.roles = roles.map((role) => role._id);
            let user = new User(user1);
            user.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              
              res.status(201).send({
                message:
                  "User Added! Check Email",
              });

                mailer.sendAdminAddedEmail(
                  email,
                  confirm
                );
             
            });
          }
        );
  } catch (error) {
      return res.status(500).send({message: "There was an error", error: error})
  }
}


exports.getAllUsers = async (req,res) => {
  try {
    let allUsers = await User.find({}).populate("roles");

    return res.status(200).send({message: "All Users", data: allUsers});
  } catch (error) {
    return res.status(500).send({message: "There was an error"})
  }
}

exports.deleteUser = async (req,res) => {
  try {
    let id = req.params.userId;

    await User.deleteOne({_id: id});

    return res.status({message: "User Deleted"});

  } catch (error) {
    return res.status(500).send({message: "There was an error"});
  }
}

