var users = require('../models/app/user');
var items = require('../models/app/items');
var dashboard = require('../models/app/homeDashboard');
var fileHandler = require('../utils/uploadFiles');
var facets = require('../models/app/facets');
var sos = require('../models/app/sos');
var news = require('../models/app/news');

module.exports = function (app) {

    app.post('/app/login/',users.login);
    app.post('/app/users/',users.createUser);
    app.get('/app/users/',users.getAppUsers);
    app.put('/app/users/:userId',users.editAppUser);
    app.get('/app/users/:userId',users.getAppUserDetails);
    app.delete('/app/users/:userId',users.deleteAppUser);

    app.get('/app/news',news.getAppUserVideos);




}




