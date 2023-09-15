
var mysql = require('mysql');
var config = require('.././database/database.js');

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

    camposCRMAdministrador: function (req, res, next) {

        res.render('administrador/adminCrmCampos', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    },
    buscarCamposAsignacionLlamadas: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SHOW COLUMNS FROM asignacion_llamada", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Mostrar Columnas - Asignación Llamadas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    agregarCamposAsignacionLlamadas: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("ALTER TABLE asignacion_llamada ADD asl_" + req.body.Field + " " + req.body.Type + "", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Guardar Columnas - Asignación Llamadas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    eliminarCamposAsignacionLlamadas: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("ALTER TABLE asignacion_llamada DROP " + req.body.Field + "", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Eliminar Columnas - Asignación Llamadas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    comporbarAsignacionLlamadas: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT Count(asignacion_llamada.asl_id) AS 'numero' FROM asignacion_llamada", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Comprobar registros - Asignación Llamadas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    }
}