var dbhandler = require('../../handlers/dbhandler');
var config = require('../../config/index');
var utils = require('../../utils/jwt')

var items = {

    getItems: function (req, res) {
        try{
            var userToken = req.headers['usertoken'];
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        }catch (err){
            return res.status(400).json({
                status: 400,
                title: 'Unable To Find Items',
                msg: "Invalid UserId"
            })
        }

        var type = req.params.type
        var id = req.params.id
        var pageNumber = (req.params.pageNumber > 0) ? req.params.pageNumber : config.app.defaultPageNumber
        var limitPerPage = (req.params.pageLimit > 0) ? req.params.pageLimit : config.app.defaultProductsLimit
        var limit = Number(limitPerPage)
        var skip = Number(limitPerPage * (pageNumber - 1))
        dbhandler.getItems(type, id, userId, limit, skip).then(function (items) {
            res.status(200).json(items);

        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Unable To Find Items',
                msg: errMsg
            });
        });
    },
    getItemDetails: function (req, res) {
        try{
            var userToken = req.headers['usertoken'];
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        }catch (err){
            return res.status(400).json({
                status: 400,
                title: 'Unable To Find Items',
                msg: "Invalid UserId"
            })
        }
        var itemId = req.params.itemId
        dbhandler.getItemDetails(itemId, userId).then(function (item) {
            res.status(200).json(item)
        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Unable To Find Item',
                msg: errMsg
            });
        });
    },
    searchItems: function (req, res) {
        try{
            var userToken = req.headers['usertoken'];
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        }catch (err){
            return res.status(400).json({
                status: 400,
                title: 'Unable To Find Items',
                msg: "Invalid UserId"
            })
        }
        var categoryId = req.params.categoryId
        var term = req.query.term;
        var pageNumber = (req.params.pageNumber > 0) ? req.params.pageNumber : config.app.defaultPageNumber
        var limitPerPage = (req.params.pageLimit > 0) ? req.params.pageLimit : config.app.defaultProductsLimit
        var limit = Number(limitPerPage)
        var skip = Number(limitPerPage * (pageNumber - 1))

        dbhandler.searchItems(term, userId, limit, skip,categoryId).then(function (items) {
            res.status(200).json(items)

        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Unable To Find Items',
                msg: errMsg
            });
        });
    },
    toggleItemLike: function (req, res) {
        try{
            var userToken = req.headers['usertoken'];
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        }catch (err){
            return res.status(400).json({
                status: 400,
                title: 'Unable To Find Items',
                msg: "Invalid UserId"
            })
        }
        var itemId = req.params.itemId
        var inputData = {userId: userId, itemId: itemId}

        dbhandler.toggleItemLike(inputData).then(function (item) {
            res.status(200).json(item)

        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Unable To Like Item',
                msg: errMsg
            });
        });
    },
    toggleItemFavourite: function (req, res) {
        try{
            var userToken = req.headers['usertoken'];
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        }catch (err){
            return res.status(400).json({
                status: 400,
                title: 'Unable To Find Items',
                msg: "Invalid UserId"
            })
        }
        var itemId = req.params.itemId
        var inputData = {userId: userId, itemId: itemId}

        dbhandler.toggleItemFavourite(inputData).then(function (item) {
            res.status(200).json(item)

        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Unable To Add Item To Favourites',
                msg: errMsg
            });
        });
    },
    getUserFavouriteItems: function (req, res) {
        try{
            var userToken = req.headers['usertoken'];
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        }catch (err){
            return res.status(400).json({
                status: 400,
                title: 'Unable To Find Items',
                msg: "Invalid UserId"
            })
        }
        var pageNumber = (req.params.pageNumber > 0) ? req.params.pageNumber : config.app.defaultPageNumber
        var limitPerPage = (req.params.pageLimit > 0) ? req.params.pageLimit : config.app.defaultProductsLimit
        var limit = Number(limitPerPage)
        var skip = Number(limitPerPage * (pageNumber - 1))
        dbhandler.getUserFavouriteItems(userId, limit, skip).then(function (items) {
            res.status(200).json(items)
        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Unable To Find Favourite Items',
                msg: errMsg
            });
        });

    },
    getItemComments: function (req, res) {
        var itemId = req.params.itemId
        var pageNumber = (req.params.pageNumber > 0) ? req.params.pageNumber : config.app.defaultPageNumber
        var limitPerPage = (req.params.pageLimit > 0) ? req.params.pageLimit : config.app.defaultProductsLimit
        var limit = Number(limitPerPage)
        var skip = Number(limitPerPage * (pageNumber - 1))
        dbhandler.getItemComments(itemId, limit, skip).then(function (comments) {
            res.status(200).json(comments);
        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Unable To Find Comments For This Item',
                msg: errMsg
            });
        });
    },
    addCommentToItem: function (req, res) {

        try{
            var userToken = req.headers['usertoken'];
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        }catch (err){
            return res.status(400).json({
                status: 400,
                title: 'Unable To Find Items',
                msg: "Invalid UserId"
            })
        }
        var itemId = req.params.itemId;
        var comment = req.body.comment
        dbhandler.addCommentToItem(itemId, userId, comment).then(function (comment) {
            res.status(200).json(comment);
        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Unable To Add Comment For This Item',
                msg: errMsg
            });
        });

    },
    deleteCommentFromItem: function (req, res) {
        try{
            var userToken = req.headers['usertoken'];
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        }catch (err){
            return res.status(400).json({
                status: 400,
                title: 'Unable To Find Items',
                msg: "Invalid UserId"
            })
        }
        var itemId = req.params.itemId;
        var commentId = req.params.commentId;
        dbhandler.deleteCommentFromItem(itemId, userId, commentId).then(function (comment) {
            if (!comment.n) {
                return res.status(404).json({
                    title: "Unable To Remove Comment From This Item",
                    msg: "Comment Not Found"
                })
            }
            res.status(200).json({title: "Comment Removed From Item Successfully"})
        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Unable To Remove Comment From This Item',
                msg: errMsg
            });
        });

    },
    applyFilter: function (req, res) {

        try{
            var userToken = req.headers['usertoken'];
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        }catch (err){
            return res.status(400).json({
                status: 400,
                title: 'Unable To Find Items',
                msg: "Invalid UserId"
            })
        }

        var itemData = {
            categoryIds: req.body.categories ? req.body.categories : [],
            color: req.body.COLORS,
            brand: req.body.BRANDS,
            minCredits: req.body.minCredits ? req.body.minCredits : 0,
            maxCredits: req.body.maxCredits ? req.body.maxCredits : 100000,
            DRESS_SIZE: req.body.DRESS_SIZE,
            UPPER_WAIST_SIZE: req.body.UPPER_WAIST_SIZE,
            LOWER_WAIST_SIZE: req.body.LOWER_WAIST_SIZE,
            SHOE_SIZE: req.body.SHOE_SIZE,
            HIP_SIZE: req.body.HIP_SIZE,
            BUST_SIZE: req.body.BUST_SIZE,
        }
        var pageNumber = (req.params.pageNumber > 0) ? req.params.pageNumber : config.app.defaultPageNumber
        var limitPerPage = (req.params.pageLimit > 0) ? req.params.pageLimit : config.app.defaultProductsLimit
        var limit = Number(limitPerPage)
        var skip = Number(limitPerPage * (pageNumber - 1))
        dbhandler.applyFilter(userId, itemData, limit, skip).then(function (items) {
            res.status(200).json(items)

        }, function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'Unable To Find Items',
                msg: errMsg
            });
        });

    },
    uploadItem: function (req, res) {

        try {
            var userToken = req.headers['usertoken'];
            var userData = utils.decodeToken(userToken);
            var userId = userData.user._id
        } catch (error) {
            return res.status(400).json({
                status: 400,
                title: 'Failed To upload Item',
                msg: "Invalid User"
            });
        }
        var itemData = req.body.itemData
        if (!itemData) {
            return res.status(400).json({
                status: 400,
                title: 'Failed To upload Item',
                msg: "itemData cant be empty"
            });
        }
        if(itemData.size && typeof(itemData.size)=="string"){
            itemData.size = JSON.parse(itemData.size)
        }
        if(itemData.size && itemData.size.SHOE_SIZE){
            var shoeSize ={}
            itemData.size.SHOE_SIZE.map(function (eachSize) {
                if(eachSize.hasOwnProperty("UK_INDIAN")){
                    shoeSize.UK_INDIAN = eachSize.UK_INDIAN
                }
                if(eachSize.hasOwnProperty("EURO")){
                    shoeSize.EURO = eachSize.EURO
                }
            })
            itemData.size.SHOE_SIZE = shoeSize
        }

        itemData.userId = userId

        dbhandler.uploadItem(itemData).then(function (item) {
            res.status(200).json(item);

        }, function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed To Upload Item',
                msg: errMsg.message
            });
        })

    }
}

module.exports = items;