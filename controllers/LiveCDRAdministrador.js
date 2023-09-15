//var Client = require('node-rest-client').Client;

module.exports = {
    getLiveCDRAdministrador: function (req, res, next) {

        res.render('administrador/adminLiveCdr', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    },
/*
    api: function (req, res, next) {

        var client = new Client();
        client.get("https://172.30.0.1:82/cdrapi?format=JSON", function (data, response) {
            res.send(data);
        }).on('error', function (err) {
            console.log(err);
            res.send(err);
            IngresarError('Error', 'Comprobar Código API - Licenciamiento', err);
        });
    }*/
}