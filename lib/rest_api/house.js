exports.on = function(app) {
    const preRestApi = '/user';
    const house = require('../role/house');
    const utilsValue = require('../utils/value');
    app.post(preRestApi + '/addHouse', function(req, res) {

    });

    app.put(preRestApi + '/editHouse', function(req, res) {
       
    });

    app.delete(preRestApi + '/removeHouse', function(req, res) {
       
    });

    app.get(preRestApi + '/getHouses', function(req, res) {
       
    });



}