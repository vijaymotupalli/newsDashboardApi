var config = {

    db: {
        host:'mongodb://127.0.0.1/newsupload',
        port: 27017,
        database: "newsupload",
        username:"admin",
        password:"123456"
    },
    server:{
      host:'localhost',
      port:'9001'

    },
    superAdmin:"SUPER_ADMIN",

    auth:{
        admin:{
            tokenExpiry : 7,
            authSecret: "videoupload",
        }
    },
    admin:{
        defaultPageLimit : 10,
        defaultPageNumber: 1
    },
    app:{
        defaultProductsLimit : 50,
        defaultPageNumber: 1
    },
    fileUpload:{
        uploadPath : 'static/uploads',
        downloadPath:'/uploads/'

    },
    s3bucket: { "accessKeyId": "AKIAJHRF5C6CKU4CR2DA", "secretAccessKey": "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", "region": "Asia Pacific (Mumbai)" }



};

module.exports = config;
