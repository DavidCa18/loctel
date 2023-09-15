var mysql = require('mysql');
var config = require('.././database/database.js');
var Client = require('node-rest-client').Client;

function IngresarError(tipo, modulo, mensaje) {
    var db = mysql.createConnection(config);
    db.connect();

    db.query("SELECT GestionError(1, '" + tipo + "', '" + modulo + "', \"" + mensaje + "\") AS msm", function (err, rows, fields) {
        if (err) {
            console.log(err);
            db.end();
        } else {
            console.log(rows);
            db.end();
        }
    });
}

module.exports = {
    guardarLicenciaAPI: function (req, res, next) {
        var serial = req.query.serial;

        var client = new Client();
        client.get("https://loctel.herokuapp.com/GenerarCodigo/" + serial + "", function (data, response) {
            res.send(data);
        }).on('error', function (err) {
            console.log(err);
            res.send(err);
            IngresarError('Error', 'Guardar Licencia API - Licenciamiento', err);
        });

    },

    comprobarLicenciaAPI: function (req, res, next) {

        var serial = req.query.serial;

        var client = new Client();
        client.get("https://loctel.herokuapp.com/ComprobarCodigo/" + serial + "", function (data, response) {
            res.send(data);
        }).on('error', function (err) {
            console.log(err);
            res.send(err);
            IngresarError('Error', 'Comprobar Licencia API - Licenciamiento', err);
        });


    },

    expirarLicenciaAPI: function (req, res, next) {

        var serial = req.query.serial;

        var client = new Client();
        client.get("https://loctel.herokuapp.com/ExpiracionCodigo/" + serial + "", function (data, response) {
            res.send(data);
        }).on('error', function (err) {
            console.log(err);
            res.send(err);
            IngresarError('Error', 'Expirar Licencia API - Licenciamiento', err);
        });

    },

    rollbackLicenciaAPI: function (req, res, next) {

        var serial = req.query.serial;

        var client = new Client();
        client.get("https://loctel.herokuapp.com/RollbackCodigo/" + serial + "", function (data, response) {
            res.send(data);
        }).on('error', function (err) {
            console.log(err);
            res.send(err);
            IngresarError('Error', 'Rollback Licencia API - Licenciamiento', err);
        });

    },

    guardarLicenciaDB: function (req, res, next) {

        var serial = req.query.serial;
        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionAut (1, '" + serial + "') AS msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Guardar Licencia DB - Licenciamiento', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    buscarLicenciaDB: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionAut (3, '') AS msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Comprobar Licencia DB - Licenciamiento', err);
            } else {
                console.log(rows);
                res.send(rows);
                db.end();
            }
        });
    },

    eliminarLicenciaDB: function (req, res, next) {

        var serial = req.query.serial;
        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionAut (2, '" + serial + "') AS msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Eliminar Licencia DB - Licenciamiento', err);
            } else {

                res.send(rows);
                db.end();
            }
        });
    },

    buscarNumeroLicenciaDB: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT Count(*) AS msm FROM gestion", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Número Licencia DB - Licenciamiento', err);
            } else {
                console.log(rows);
                res.send(rows);
                db.end();
            }
        });
    },

    expirarLicenciaCallBackAPI: function (serial, callback) {

        var client = new Client();
        client.get("https://loctel.herokuapp.com/ExpiracionCodigo/" + serial + "", function (data, response) {
            callback(data);
        }).on('error', function (err) {
            console.log(err);
            IngresarError('Error', 'Expirar Licencia API - Licenciamiento', err);
        });
    },

    buscarLicenciaCallBackDB: function (serial, callback) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionAut (3, '') AS msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                IngresarError('Error', 'Comprobar Licencia DB - Licenciamiento', err);
            } else {
                callback(rows);
                db.end();
            }
        });
    },

    eliminarLicenciaCallBackDB: function (serial, callback) {
        console.log(serial);
        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionAut (2, '" + serial + "') AS msm", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Eliminar Licencia DB - Licenciamiento', err);
            } else {

                callback(rows);
                db.end();
            }
        });
    }

}