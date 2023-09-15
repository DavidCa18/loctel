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
    getConsultasCRMAdministrador: function (req, res, next) {

        res.render('administrador/adminCrmConsultas', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    },

    buscarMarcaCentral: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT mar_id, mar_nombre FROM marca_central", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Marca Central - Llamadas Asignadas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarModeloCentral: function (req, res, next) {

        var marca_central = req.query.marca_central;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT cen_id, cen_nombre FROM modelo_central INNER JOIN marca_central ON modelo_central.mar_id = marca_central.mar_id WHERE marca_central.mar_id = '" + marca_central + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Modelo Central - Llamadas Asignadas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    buscarDepartamentos: function (req, res, next) {

        var modelo_central = req.query.modelo_central;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT dep_id, dep_nombre FROM departamento INNER JOIN modelo_central ON departamento.cen_id = modelo_central.cen_id INNER JOIN marca_central ON modelo_central.mar_id = marca_central.mar_id WHERE modelo_central.cen_id = '" + modelo_central + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Departamento - Llamadas Asignadas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    buscarExtension: function (req, res, next) {

        var departamento = req.query.departamento;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT ext_id, ext_nombre, ext_numero FROM extension WHERE ext_estado != 0 AND dep_id = '" + departamento + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Extensión - Llamadas Asignadas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarAsignacionLlamadas: function (req, res, next) {

        var extensiones = req.query.extensiones;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_detalles_llamadas_asignadas ('" + extensiones + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Llamadas Asignadas - Llamadas Asignadas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    }
}