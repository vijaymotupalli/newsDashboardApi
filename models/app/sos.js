var dbhandler = require('../../handlers/dbhandler');
var config = require('../../config/index');
var utils = require('../../utils/jwt');

var sos = {

    createPost: function (req, res) {
        var post = req.body.post
        var images = req.body.images
        var type = req.body.type
        var taggedProducts = req.body.taggedProducts
        var userToken = req.headers['usertoken'];
        try {
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        } catch (err) {
            return res.status(400).json({
                title: 'Failed To Get User Id',
                msg: err
            });
        }
        if (!userId) {
            return res.status(400).json({
                title: 'Failed To Create Post',
                msg: "User Id cant be empty"
            });
        }
        if (!post) {
            return res.status(400).json({
                title: 'Failed To Create Post',
                msg: "Post cant be empty"
            });
        }
        var data = {post: post, type: type, taggedProducts: taggedProducts, userId: userId,images:images}

        dbhandler.createPost(data).then(function (post) {
            res.status(200).json(post);
        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Failed To Create Post',
                msg: errMsg.message
            });
        });


    },
    replyPost: function (req, res) {
        var postId = req.params.postId
        var reply = req.body.reply
        var images = req.body.images
        var taggedProducts = req.body.taggedProducts
        var userToken = req.headers['usertoken'];
        try {
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        } catch (err) {
            return res.status(400).json({
                title: 'Failed To Get User Id',
                msg: err
            });
        }
        if (!userId) {
            return res.status(400).json({
                title: 'Failed To Create Post',
                msg: "User Id cant be empty"
            });
        }
        if (!postId) {
            return res.status(400).json({
                title: 'Failed To Create Post',
                msg: "Post Id cant be empty"
            });
        }
        var data = {postId: postId, taggedProducts: taggedProducts, userId: userId,reply:reply,images:images}

        dbhandler.replyPost(data).then(function (reply) {
            res.status(200).json(reply);
        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Failed To Post Reply',
                msg: errMsg.message
            });
        });


    },
    getPosts:function (req,res) {
        try{
            var userToken  = req.headers['usertoken'];
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        }catch(err) {
            return res.status(400).json({
                title: 'Failed To Load Posts',
                msg: err.message
            });

        }

        dbhandler.getPosts(userId).then(function (posts) {
            res.status(200).json(posts);
        },function (err) {
            return res.status(400).json({
                title: 'Failed To Load Posts',
                msg: err.message
            });
        })

    },
    getPostReplies:function (req,res) {
        try{
            var userToken  = req.headers['usertoken'];
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        }catch(err) {
            return res.status(400).json({
                title: 'Failed To Load Replies',
                msg: err.message
            });

        }

       var postId = req.params.postId
        if(!postId){
            return res.status(400).json({
                title:"Unable To Find Replies",
                msg:"PostId Required It Cant Be Empty"
            })
        }
        dbhandler.getPostReplies(postId,userId).then(function (postReplies) {
            res.status(200).json(postReplies);
        },function (err) {
            return res.status(400).json({
                title: 'Failed To Load Replies',
                msg: err.message
            });
        })

    },
    flagPost:function (req,res) {
        var userToken = req.headers['usertoken'];
        try {
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        } catch (err) {
            return res.status(400).json({
                title: 'Failed To Get User Id',
                msg: err
            });
        }
        if (!userId) {
            return res.status(400).json({
                title: 'Failed To Flag Post',
                msg: "User Id cant be empty"
            });
        }

        var postId =req.params.postId
        var reason = req.body.reason

        var data = {userId:userId,postId:postId,reason:reason}

        dbhandler.flagPost(data).then(function (result) {
            res.status(200).json(result);
        },function (err) {
            return res.status(400).json({
                title: 'Failed To Put Flag Post',
                msg: err.message
            });

        });
    },
    flagReply:function (req,res) {
        var userToken = req.headers['usertoken'];
        try {
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        } catch (err) {
            return res.status(400).json({
                title: 'Failed To Get User Id',
                msg: err
            });
        }
        if (!userId) {
            return res.status(400).json({
                title: 'Failed To Flag Reply',
                msg: "User Id cant be empty"
            });
        }

        var replyId =req.params.replyId
        var reason = req.body.reason

        var data = {userId:userId,replyId:replyId,reason:reason}

        dbhandler.flagReply(data).then(function (result) {
            res.status(200).json(result);
        },function (err) {
            return res.status(400).json({
                title: 'Failed To Flag Reply',
                msg: err.message
            });

        });
    },
    togglePostLike:function (req,res) {
        var userToken  =req.headers['usertoken'];
        var postId = req.params.postId;
        var userData = utils.decodeToken(userToken);
        var userId = userData.user._id
        var inputData = {userId:userId,postId:postId}
        dbhandler.togglePostLike(inputData).then(function (postlikeresult) {
            res.status(200).json(postlikeresult)

        },function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Unable To Like/Dislike Post',
                msg: errMsg
            });
        });
    },
    getItemsTotag:function (req,res) {

        var userToken = req.headers['usertoken'];
        try {
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        } catch (err) {
            return res.status(400).json({
                title: 'Failed To Get User Id',
                msg: err
            });
        }
        if (!userId) {
            return res.status(400).json({
                title: 'Failed To Create Post',
                msg: "User Id cant be empty"
            });
        }
        var data = {userId: userId}

        dbhandler.getUserUploadedItems(data).then(function (items) {
            res.status(200).json(items);
        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Failed To Get items',
                msg: errMsg.message
            });
        });

    },
    searchSosPosts:function (req,res) {
        var userToken  =req.headers['usertoken'];
        var userData = utils.decodeToken(userToken);
        var userId = userData.user._id

        var term = req.query.term;
        var pageNumber = (req.params.pageNumber > 0) ? req.params.pageNumber : config.app.defaultPageNumber
        var limitPerPage = (req.params.pageLimit > 0) ? req.params.pageLimit : config.app.defaultProductsLimit
        var limit = Number(limitPerPage)
        var skip=Number(limitPerPage*(pageNumber-1))

        dbhandler.searchSosPosts(term,userId,limit,skip).then(function (posts) {
            res.status(200).json(posts)

        },function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Unable To Find Posts',
                msg: errMsg
            });
        });
    }


}

module.exports = sos;