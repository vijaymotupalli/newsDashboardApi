var dbhandler = require('../../handlers/dbhandler');
var config = require('../../config/index');
var utils = require('../../utils/jwt')


var facets = {

    getFacets: function (req, res) {

        var facet_group = req.params.facet_group;
        if (!facet_group) {
            return res.json({
                status: 400,
                title: 'Please Specify a Facet Group',
                msg: "Facet Group can't be empty"
            });
        }

        var category = req.params.category;
        if (!category) {
            dbhandler.getfacets(facet_group).then(function (facet_group) {
                if (facet_group) {
                    if (facet_group.options.include_categories) {
                        dbhandler.getAllCategories().then(function (categories) {
                            facet_group.categories = categories;
                            delete facet_group.options;
                            res.json(facet_group);
                        });
                    }
                    else {
                        delete facet_group.options;
                        res.json(facet_group);
                    }
                }
                else
                    res.json({title:"Facet Group not Found",msg:"Could not find a facet group named " + req.params.facet_group})

            })
        }
        else {
            dbhandler.getfacetsbycategories(facet_group, category).then(function (facet_group) {
                if (facet_group) {
                if (facet_group.options.include_categories) {
                    dbhandler.getAssociatedCategories(category).then(function (categories) {
                        facet_group.categories = categories;
                        delete facet_group.options;
                        res.json(facet_group);
                    });
                }
                else {
                    delete facet_group.options;
                    res.json(facet_group);
                }
            }
            else
                    res.json({title:"No Facets found",msg:"Could not find any facets in the category :" + category})
            })
        }

    }

}

module.exports = facets;