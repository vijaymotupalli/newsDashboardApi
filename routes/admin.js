var auth = require('../models/admin/authentication');
var news = require('../models/admin/news');




module.exports = function (app) {

    app.post('/api/login',auth.login);
    app.post('/api/users',auth.register);
    app.get('/api/users/:adminId',auth.getUserDetails)
    app.get('/api/users',auth.getAdmins);

    app.put('/api/users/:adminId',auth.editAdmin);
    app.delete('/api/users/:adminId',auth.deleteAdmin);
   // app.post('/api/uploadlogo',news.uploadLogo);
    app.get('/api/news',news.getNews);
   // app.post('/api/videos/applyfilter',videos.getVideos);
    app.post('/api/news',news.postNews);
    app.put('/api/news/:newsId',news.editNews);
    app.delete('/api/news/:newsId',news.deleteNews);
    app.get('/api/myprofile',auth.getAdminDetails);
    app.post('/api/uploadlogo',news.uploadLogo);


}




