var data = require('../models/admin/data');

module.exports = function (app) {

    app.get('/data/categories',data.getCategories);
    app.get('/data/countries',data.getCountries);
    app.get('/data/localities',data.getLocalities);
    app.get('/data/types',data.getTypes);

    app.post('/data/categories',data.addCategory);
    app.post('/data/countries',data.addCountry);
    app.post('/data/localities',data.addLocality);
    app.post('/data/types',data.addType);


    app.put('/data/categories/:categoryId',data.editCategory);
    app.put('/data/countries/:countryId',data.editCountry);
    app.put('/data/localities/:localityId',data.editLocality);
    app.put('/data/types/:typeId',data.editType);


    app.delete('/data/categories/:categoryId',data.deleteCategory);
    app.delete('/data/countries/:countryId',data.deleteCountry);
    app.delete('/data/localities/:localityId',data.deleteLocality);
    app.delete('/data/types/:typeId',data.deleteType);

}




