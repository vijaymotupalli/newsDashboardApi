//Write All Mongo Queries Here
var config = require('../config/index');
var mongoose = require('mongoose');
var models = require('../handlers/schema');
var moment = require('moment');
var async = require("async");
var jwt = require('../utils/jwt');
var crypto = require('crypto');



mongoose.connect(config.db.host, {
    user: config.db.username, pass: config.db.password, auth: {
        authdb: 'admin'
    }
}, function (err) {
    if (err) {
        console.log("----DATABASE CONNECTION FAILED----", err);
    } else {
        console.log("connected to database" + " " + config.db.database + " ");
    }
});

var db = mongoose.connection.db;

var dbHandler = {

    //admin
    login: function (email, password) {
        return new Promise(function (resolve, reject) {
            models.admins.findOne({email: email, password: password}, {password: 0},function (err, admin) {
                    if (!err) {
                        if(admin){
                            var code = jwt.generateAuthToken(admin);
                            admin = Object.assign({access_token:code},JSON.parse(JSON.stringify(admin)))
                        }
                        resolve(admin)
                    }
                })
        });
    },
    userLogin: function (username, password) {
        return new Promise(function (resolve, reject) {
          return  models.users.findOne({userName: username, password: password}, {password: 0},function (err, user) {

                    if (!err) {
                        if(user){
                            var code = jwt.generateAuthToken(user);
                            user = Object.assign({access_token:code},JSON.parse(JSON.stringify(user)))
                        }
                       return resolve(user)
                    }
                   return reject(err);
                })
        });
    },
    register: function (admin) {
        return new Promise(function (resolve, reject) {
            return models.admins.findOne({email: admin.email}).then(function (existedAdmin, err) {
                if (existedAdmin) {
                    reject("Email Already Exists")
                }
                if (err) {
                    reject(err);
                }
                return models.admins.create({
                    name: admin.name,
                    email: admin.email,
                    password: admin.password,
                    phone: admin.phone,
                    school: admin.school,
                    address: admin.address,schoolLogoUrl:admin.schoolLogoUrl
                }).then(function (admin, err) {
                    if (!err) {
                        resolve(admin);
                    }
                }).catch(function (error) {
                    reject(error)
                })
            })

        });
    },
    appRegister: function (user) {
        return new Promise(function (resolve, reject) {
            return models.users.findOne({userName: user.username}).then(function (existedUser, err) {
                if (existedUser) {
                   return reject("UserName Already Exists")
                }

                if (err) {
                   return reject(err);
                }
                return models.users.findOne({phone:user.phone}).then(function (existedUser,err) {
                    if(existedUser){
                       return reject("Phone Number Already Exists")
                    }
                    if (err) {
                       return reject(err);
                    }

                    return models.users.findOne({email:user.email}).then(function (existedUser,err) {
                        if (existedUser) {
                           return reject("Email Already Exists")
                        }
                        if (err) {
                           return reject(err);
                        }
                        return models.users.create({
                            name:user.name,
                            userName: user.username,
                            email: user.email,
                            password: user.password,
                            phone: user.phone,
                            school: user.school,
                            address: user.address
                        }).then(function (user, err) {
                            if (!err) {
                               return resolve(user);
                            }
                        }).catch(function (error) {
                            reject(error)
                        })

                    })
                })

            })

        });
    },
    postNews: function (news) {
        return new Promise(function (resolve, reject) {
            return models.news.create({
                        title: news.title,
                        sourceUrl : news.sourceUrl,
                        admin:news.admin,
                        description:news.description,
                        category:news.category,
                        type:news.type,
                        country:news.country,
                        locality:news.locality,
                        image:news.image

                }).then(function (news, err) {
                    if (!err) {
                        resolve(news);
                    }
                }).catch(function (error) {
                    reject(error)
                })


        });
    },
    getNews: function (admin) {
        var andQuery = []
        var query = {admin:admin._id}
        if(admin.role != config.superAdmin){andQuery.push(query)}

        var finalQuery = andQuery.length ? {$and:andQuery}:{}

        return new Promise(function (resolve, reject) {
            return models.news.aggregate([
                {$lookup:{from:"types",localField:"type",foreignField:"_id",as:"type"}},
                {$lookup:{from:"categories",localField:"category",foreignField:"_id",as:"category"}},
                {$lookup:{from:"localities",localField:"locality",foreignField:"_id",as:"locality"}},
                {$lookup:{from:"countries",localField:"country",foreignField:"_id",as:"country"}},
                {$addFields:{
                    type:{$arrayElemAt:["$type",0]},
                    category:{$arrayElemAt:["$category",0]},
                    country:{$arrayElemAt:["$country",0]},
                    locality:{$arrayElemAt:["$locality",0]},
                }},{$sort:{createdAt:-1}}
            ]).then(function (news, err) {
                    if (!err) {
                        resolve(news);
                    }
                }).catch(function (error) {
                    reject(error)
                })


        });
    },
    getAdminDetails: function (admin) {
        return new Promise(function (resolve, reject) {
            return models.admins.findOne({_id:admin}).then(function (admin, err) {
                if (!err) {
                        resolve(admin);
                    }
                }).catch(function (error) {
                    reject(error)
                })

        });
    },
    getUserDetails: function (admin) {
        return new Promise(function (resolve, reject) {
            return models.admins.findOne({email:admin}).then(function (admin, err) {
                if (!err) {
                        resolve(admin);
                    }
                }).catch(function (error) {
                    reject(error)
                })

        });
    },
    getAppUserDetails: function (userId) {
        return new Promise(function (resolve, reject) {
            return models.users.findOne({_id:userId},{password:0}).then(function (user, err) {
                if (!err) {
                        resolve(user);
                    }
                }).catch(function (error) {
                    reject(error)
                })

        });
    },
    getAdmins: function () {
        return new Promise(function (resolve, reject) {
            return models.admins.find({}).then(function (admins, err) {
                if (!err) {
                        resolve(admins);
                    }
                }).catch(function (error) {
                    reject(error)
                })

        });
    },
    getAppUsers: function () {
        return new Promise(function (resolve, reject) {
            return models.users.find({},{password:0}).sort({createdAt:-1}).then(function (users, err) {
                if (!err) {
                    resolve(users);
                }
            }).catch(function (error) {
                reject(error)
            })

        });
    },
    deleteAdmin: function (adminId) {
        return new Promise(function (resolve, reject) {
            return models.admins.remove({_id:adminId}).then(function (data, err) {
                if (!err) {
                    resolve({title:"Deleted Successfully"});
                }
            }).catch(function (error) {
                reject(error)
            })
        });
    },
    deleteAppUser: function (userId) {
        return new Promise(function (resolve, reject) {
            return models.users.remove({_id:userId}).then(function (data, err) {
                if (!err) {
                    resolve({title:"Deleted Successfully"});
                }
            }).catch(function (error) {
                reject(error)
            })
        });
    },
    editAdmin : function (adminId,updateData) {
        return new Promise(function (resolve, reject) {
            return models.admins.update({email:adminId},updateData).then(function (admin, err) {
                if (err) {
                    reject(err);
                }
                resolve(admin)
            }).catch(function (error) {
                reject(error)
            })

        });
    },
    editAppUser : function (userId,updateData) {
        return new Promise(function (resolve, reject) {
            return models.users.update({_id:userId},updateData).then(function (user, err) {
                if (err) {
                    reject(err);
                }
                resolve(user)
            }).catch(function (error) {
                reject(error)
            })

        });
    },
    editNews : function (newsId,updateData) {
        return new Promise(function (resolve, reject) {
            return models.news.update({_id:newsId},updateData).then(function (news, err) {
                if (err) {
                    reject(err);
                }
                resolve(news)
            }).catch(function (error) {
                reject(error)
            })

        });
    },
    deleteNews : function (newsId,admin) {

       var query = ""
        query = {_id:newsId,admin:admin._id}

        if(admin.role == config.superAdmin){
            query = {_id:newsId}
        }

        return new Promise(function (resolve, reject) {
            return models.news.remove(query).then(function (news, err) {
                if (err) {
                    reject(err);
                }
                if(!news.result.n){
                    reject("News Not Found")
                }
                resolve("News Deleted Successfully")

            }).catch(function (error) {
                reject(error)
            })

        });
    },
    addData: function (data,collection) {
        return new Promise(function (resolve, reject) {
            return models[collection].create(data).then(function (data, err) {
                if (!err) {
                    resolve(data);
                }
            }).catch(function (error) {
                reject(error)
            })
        });
    },
    editData: function (id,data,collection) {
        return new Promise(function (resolve, reject) {
            return models[collection].update({_id:id},{name:data.name}).then(function (data, err) {
                if (!err) {
                    resolve(data);
                }
            }).catch(function (error) {
                reject(error)
            })
        });
    },
    deleteData: function (id,collection) {
        return new Promise(function (resolve, reject) {
            return models[collection].remove({_id:id}).then(function (data, err) {
                if (!err) {
                    resolve({title:"Deleted Successfully"});
                }
            }).catch(function (error) {
                reject(error)
            })
        });
    },
    getData: function (collection) {
        return new Promise(function (resolve, reject) {
            return models[collection].find().then(function (data, err) {
                if (!err) {
                    resolve(data);
                }
            }).catch(function (error) {
                reject(error)
            })
        });
    },
    getAppUserVideos: function (user,filters) {
        return new Promise(function (resolve, reject) {
            return models.news.aggregate([
                {$lookup:{from:"types",localField:"type",foreignField:"_id",as:"type"}},
                {$lookup:{from:"categories",localField:"category",foreignField:"_id",as:"category"}},
                {$lookup:{from:"localities",localField:"locality",foreignField:"_id",as:"locality"}},
                {$lookup:{from:"countries",localField:"country",foreignField:"_id",as:"country"}},
                {$addFields:{
                    type:{$arrayElemAt:["$type",0]},
                    category:{$arrayElemAt:["$category",0]},
                    country:{$arrayElemAt:["$country",0]},
                    locality:{$arrayElemAt:["$locality",0]},
                }},{$sort:{createdAt:-1}}
            ]).then(function (news, err) {
                if (!err) {
                    resolve(news);
                }
            }).catch(function (error) {
                reject(error)
            })


        });
    },

}


module.exports = dbHandler







