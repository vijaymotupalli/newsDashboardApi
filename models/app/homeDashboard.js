var dbhandler = require('../../handlers/dbhandler');

var dashboard = {

    getDashboard : function (req,res) {
        dbhandler.getDashboard().then(function (dashboard) {
            if(dashboard){
                return res.status(200).json(dashboard)
            }
        },function (errMsg) {
            res.status(400);
            return res.json({
                status: 400,
                title: 'dashboard not found',
                msg: errMsg
            });
        });
    }
}

module.exports = dashboard