/**
 * Created by Vijay on 27-Jun-17.
 */
var dbhandler = require('../../handlers/dbhandler');
var config = require('../../config/index');


var videos = {

    getAppUserVideos:function (req,res) {
        // var user = req.user
        // if(!user || !user._id){
        //     return res.status(400).json({
        //         status: 400,
        //         title: 'User Cant Be Empty',
        //         msg: "Invalid User"
        //     });
        // }
        // var filters = {
        //     subject:req.body.subject ? req.body.subject :[],
        //     standard:req.body.standard ? req.body.standard :[]
        // }

       return dbhandler.getAppUserVideos().then(function (videos) {
            return res.status(200).json(videos)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Get News',
                msg: errMsg
            });
        });

    }




}


module.exports = videos

