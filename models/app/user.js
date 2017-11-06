var dbhandler = require('../../handlers/dbhandler');
var config = require('../../config/index');
var utils = require('../../utils/jwt');
var crypto = require('crypto');


var user = {


    login:function (req,res) {
        var username = req.body.username
        var password = req.body.password

        if(!username || !password){
            return res.status(401).json({
                title: 'Username and Password Cant Be Empty',
                msg: "Please Enter Username And Pssword"
            })
        }

        var hashed_password = crypto.createHash('md5').update(password).digest("hex");
        dbhandler.userLogin(username,hashed_password).then(function (user) {
            if(!user){
                return res.status(401).json({
                    title: 'Invalid credentials',
                    msg: "Incorrect Username or Password "
                })
            }
            return res.json(user)
        },function (errMsg) {
            res.status(401);
            return res.json({
                title: 'Unauthorized Access',
            });
        })

    },
    createUser: function (req, res) {

     var    username = req.body.username
     var    name = req.body.name
     var    email = req.body.email
     var    password = req.body.password
     var    phone = req.body.phone
     var    school = req.body.school ? req.body.school :""
     var    address = req.body.address

        if (!username || !email || !password || !phone) {
            return res.json({
                status: 400,
                title: 'Failed To Create User',
                msg: "Please Fill All Require Fields"
            });
        }

        var user = {
            name:name,
            username :username,
            email :email,
            password :crypto.createHash('md5').update(password).digest("hex"),
            phone :phone,
            school :school,
            address :address,
        }

        dbhandler.appRegister(user).then(function (user) {
                    return res.status(200).json(user)

        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Failed To Create User',
                msg: errMsg ? errMsg :errMsg.message
            });
        });


    },
    editAppUser:function (req,res) {


        var userId = req.params.userId
        var name = req.body.name;
        var address = req.body.address;

        if(!userId){
            return res.status(400).json({
                title: 'User Id Cant Be Empty',
                msg: 'Please Enter User Id'
            });
        }
        var updateData = {name:name,address:address}

        dbhandler.editAppUser(userId,updateData).then(function (updatedUser) {
            res.status(200).json(updatedUser)

        },function (errMsg) {
            res.status(400);
            return res.json({
                title: 'Failed To Update User',
                msg: errMsg
            });
        }).catch(function (err) {
            res.status(400);
            return res.json({
                title: 'Failed To Update User',
                msg: err
            });
        })

    },
    getAppUsers:function (req,res) {

        dbhandler.getAppUsers().then(function (users) {

            if(!users){
                return res.status(404).json({
                    title: 'App Users Not Found',
                    msg: "App Users You Are looking Not Found"
                })
            }

            res.status(200).json(users)

        },function (errMsg) {
            res.status(400);
            return res.json({
                title: 'Failed To Get App Users',
                msg: errMsg
            });
        }).catch(function (err) {
            res.status(400);
            return res.json({
                title: 'Failed To Get App Users',
                msg: err
            });
        })

    },
    deleteAppUser:function (req,res) {
        var userId = req.params.userId
        if(!userId){
            return res.status(400).json({
                title: 'Failed to Remove User',
                msg: "User Id required"
            })
        }
        dbhandler.deleteAppUser(userId).then(function (result) {
            return res.status(200).json(result)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Delete User',
                msg: errMsg
            });
        });

    },
    getAppUserDetails:function (req,res) {
        var userId = req.params.userId
        if(!userId){
            return res.status(400).json({
                title: 'User Id  Cant Be Empty',
                msg: 'Please Enter User Id '
            });
        }
        dbhandler.getAppUserDetails(userId).then(function (user) {
            if(!user){
                return res.status(404).json({
                    title: 'User Not Found',
                    msg: "User You Are looking Not Found"
                })
            }
            res.status(200).json(user)
        },function (errMsg) {
            res.status(400);
            return res.json({
                title: 'Failed To Get Admin Details',
                msg: errMsg
            });
        }).catch(function (err) {
            res.status(400);
            return res.json({
                title: 'Failed To Get Admin Details',
                msg: err
            });
        })

    },


}

module.exports = user;