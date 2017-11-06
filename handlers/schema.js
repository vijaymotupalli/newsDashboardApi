var mongoose = require('mongoose'),
materializedPathPlugin = require('mongoose-materialized'),
    customId = require('mongoose-hook-custom-id');

// Creating  Schemas

var adminSchema = new mongoose.Schema({
    name:{ type: String},
    email:{ type: String ,required: true},
    password:{ type: String ,required: true},
    phone:{ type: String },
    school:{ type: String },
    schoolLogoUrl:{ type: String },
    address:{ type: String },
},{ versionKey: false , timestamps: true});

var userSchema = new mongoose.Schema({
    name:{type:String},
    userName:{ type: String},
    email:{ type: String},
    password:{ type: String ,required: true},
    phone:{ type: String },
    school:{ type: String },
    address:{ type: String },
},{ versionKey: false , timestamps: true});

var newsSchema = new mongoose.Schema({
    title:{ type: String,required: true},
    sourceUrl:{ type: String,required: true},
    description:{ type: String },
    admin:{ type: String,required: true },
    category:{ type: String,required: true },
    country:{type: String},
    locality:{type: String},
    image:{type: String},
    type:{type: String}
},{ versionKey: false , timestamps: true});

var categorySchema = new mongoose.Schema({
    name:{type: String,required: true}
})
var countrySchema = new mongoose.Schema({
    name:{type: String,required: true}
})
var localitySchema = new mongoose.Schema({
    name:{type: String,required: true}
})
var typeSchema = new mongoose.Schema({
    name:{type: String,required: true}
})


//plugins
adminSchema.plugin(customId, {mongoose: mongoose});
newsSchema.plugin(customId, {mongoose: mongoose});
categorySchema.plugin(customId, {mongoose: mongoose});
countrySchema.plugin(customId, {mongoose: mongoose});
localitySchema.plugin(customId, {mongoose: mongoose});
typeSchema.plugin(customId, {mongoose: mongoose});
userSchema.plugin(customId, {mongoose: mongoose});

//models

var admins = mongoose.model('admins',adminSchema,'admins');
var users = mongoose.model('users',userSchema,'users');
var news = mongoose.model('news',newsSchema,'news');
var categories = mongoose.model('categories',categorySchema,'categories');
var countries = mongoose.model('countries',countrySchema,'countries');
var localities = mongoose.model('localities',localitySchema,'localities');
var types = mongoose.model('types',typeSchema,'types');


//exports

exports.admins = admins;
exports.users = users;
exports.news = news;
exports.categories = categories;
exports.countries = countries;
exports.localities = localities;
exports.types = types;


