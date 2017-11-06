/**
 * Created by Vijay on 27-Jun-17.
 */
var dbhandler = require('../../handlers/dbhandler');
var config = require('../../config/index');


var data = {


    addCategory:function (req,res) {
        var categoryData = {name:req.body.name}
        dbhandler.addData(categoryData,"categories").then(function (category) {
            return res.status(200).json(category)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Add category',
                msg: errMsg
            });
        });

    },
    editCategory:function (req,res) {
        var categoryId = req.params.categoryId
        if(!categoryId){
            return res.status(400).json({
                title: 'Failed to Edit Category',
                msg: "Category Id required"
            })
        }

        var categoryData = {name:req.body.name}
        dbhandler.editData(categoryId,categoryData,"categories").then(function (category) {
            return res.status(200).json(category)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Edit Category',
                msg: errMsg
            });
        });

    },
    deleteCategory:function (req,res) {
        var categoryId = req.params.categoryId
        if(!categoryId){
            return res.status(400).json({
                title: 'Failed to Edit Category',
                msg: "Category Id required"
            })
        }

        dbhandler.deleteData(categoryId,"categories").then(function (category) {
            return res.status(200).json(category)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Delete Category',
                msg: errMsg
            });
        });

    },
    getCategories:function (req,res) {

        return dbhandler.getData("categories").then(function (categories) {
            return res.status(200).json(categories)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Get Categories',
                msg: errMsg
            });
        });

    },

    addCountry:function (req,res) {
        var countryData = {name:req.body.name}
        dbhandler.addData(countryData,"countries").then(function (country) {
            return res.status(200).json(country)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Add Country',
                msg: errMsg
            });
        });

    },
    getCountries:function (req,res) {

        return dbhandler.getData("countries").then(function (countries) {
            return res.status(200).json(countries)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Get Countries',
                msg: errMsg
            });
        });

    },
    editCountry:function (req,res) {
        var countryId = req.params.countryId
        if(!countryId){
            return res.status(400).json({
                title: 'Failed to Edit Country',
                msg: "Country Id required"
            })
        }
        var countryData = {name:req.body.name}
        dbhandler.editData(countryId,countryData,"countries").then(function (country) {
            return res.status(200).json(country)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Edit Country',
                msg: errMsg
            });
        });

    },
    deleteCountry:function (req,res) {
        var countryId = req.params.countryId
        if(!countryId){
            return res.status(400).json({
                title: 'Failed to Delete Country',
                msg: "Country Id required"
            })
        }
        dbhandler.deleteData(countryId,"countries").then(function (country) {
            return res.status(200).json(country)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Delete Country',
                msg: errMsg
            });
        });

    },

    addLocality:function (req,res) {
        var localityData = {name:req.body.name}
        dbhandler.addData(localityData,"localities").then(function (locality) {
            return res.status(200).json(locality)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Add Locality',
                msg: errMsg
            });
        });

    },
    getLocalities:function (req,res) {

        return dbhandler.getData("localities").then(function (localities) {
            return res.status(200).json(localities)
        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Get Localities',
                msg: errMsg
            });
        });

    },
    editLocality:function (req,res) {
        var localityId = req.params.localityId
        if(!localityId){
            return res.status(400).json({
                title: 'Failed to Edit locality',
                msg: "locality Id required"
            })
        }
        var localityData = {name:req.body.name}
        dbhandler.editData(localityId,localityData,"localities").then(function (locality) {
            return res.status(200).json(locality)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Edit Locality',
                msg: errMsg
            });
        });

    },
    deleteLocality:function (req,res) {
        var localityId = req.params.localityId
        if(!localityId){
            return res.status(400).json({
                title: 'Failed to Delete Locality',
                msg: "Locality Id required"
            })
        }
        dbhandler.deleteData(localityId,"localities").then(function (locality) {
            return res.status(200).json(locality)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Delete Locality',
                msg: errMsg
            });
        });

    },

    addType:function (req,res) {
        var typeData = {name:req.body.name}
        dbhandler.addData(typeData,"types").then(function (type) {
            return res.status(200).json(type)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Add Type',
                msg: errMsg
            });
        });

    },
    getTypes:function (req,res) {
        return dbhandler.getData("types").then(function (types) {
            return res.status(200).json(types)
        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Get Types',
                msg: errMsg
            });
        });

    },
    editType:function (req,res) {
        var typeId = req.params.typeId
        if(!typeId){
            return res.status(400).json({
                title: 'Failed to Edit Type',
                msg: "Type Id required"
            })
        }
        var typeData = {name:req.body.name}
        dbhandler.editData(typeId,typeData,"types").then(function (type) {
            return res.status(200).json(type)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Edit Type',
                msg: errMsg
            });
        });

    },
    deleteType:function (req,res) {
        var typeId = req.params.typeId
        if(!typeId){
            return res.status(400).json({
                title: 'Failed to Delete Type',
                msg: "Type Id required"
            })
        }
        dbhandler.deleteData(typeId,"types").then(function (type) {
            return res.status(200).json(type)

        },function (errMsg) {
            return res.status(400).json({
                status: 400,
                title: 'Failed to Delete Type',
                msg: errMsg
            });
        });

    },


}


module.exports = data

