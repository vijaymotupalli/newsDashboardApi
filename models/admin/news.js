/**
 * Created by Vijay on 27-Jun-17.
 */
var dbhandler = require('../../handlers/dbhandler');
var config = require('../../config/index');
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')


var news = {

    postNews:function (req,res) {
        var adminData = req.user
        var title = req.body.title;
        var sourceUrl = req.body.sourceUrl;
        var description = req.body.description;
        var category = req.body.category;
        var type = req.body.type;
        var country = req.body.country;
        var locality = req.body.locality;
        var image = req.body.image;

        if(!sourceUrl){
            return res.status(400).json({
                status: 400,
                title: 'Source Url Cant Be Empty',
                msg: "Enter News Url"
            });
        }

        var news = {
            title: title,
            sourceUrl : sourceUrl,
            admin:adminData._id,
            description:description,
            category:category,
            type:type,
            country:country,
            locality:locality,
            image:image
        }


        console.log(news);
        dbhandler.postNews(news).then(function (news) {
            return res.status(200).json(news)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Post News',
                msg: errMsg
            });
        });

    },
    getNews:function (req,res) {
        var admin = req.user

        if(!admin || !admin._id){
            return res.status(400).json({
                status: 400,
                title: 'User Cant Be Empty',
                msg: "Invalid User"
            });
        }

       return dbhandler.getNews(admin).then(function (news) {
            return res.status(200).json(news)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed To Get News',
                msg: errMsg
            });
        });

    },
    editNews:function (req,res) {

        var sourceUrl = req.body.sourceUrl;
        var category = req.body.category;
        var type = req.body.type;
        var title = req.body.title;
        var description = req.body.description;
        var newsId = req.params.newsId;
        var image =  req.body.image;

        var newsData = {
            sourceUrl:sourceUrl,
            category:category,
            type:type,
            title: title,
            description:description,
            image:image,
        }

        dbhandler.editNews(newsId,newsData).then(function (news) {
            return res.status(200).json({title:"News Updated Successfully"})
        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Update News',
                msg: errMsg
            });
        });

    },
    deleteNews:function (req,res) {
        var admin = req.user
        var newsId = req.params.newsId;
        dbhandler.deleteNews(newsId,admin).then(function (news) {
            return res.status(200).json({title:"News Deleted Successfully"})
        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Delete News',
                msg: errMsg
            });
        });

    },
    uploadLogo:function (req ,res) {
        var s3 = new aws.S3({});
        var upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: 'vrscience',
                acl: 'public-read',
                contentType: multerS3.AUTO_CONTENT_TYPE,
                key: function (req, file, cb) {
                    cb(null, file.originalname)
                }
            })
        }).single('file');
        upload(req, res, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                res.status(200);
                res.json(req.file.location);
            }
        });

    }

}


module.exports = news

