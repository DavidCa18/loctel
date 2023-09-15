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

    getBusquedasAdministradorGrand: function (req, res, next) {

        var db1 = mysql.createConnection(config);
        db1.connect();

        db1.query("SELECT cen_id, cen_nombre FROM modelo_central INNER JOIN marca_central ON modelo_central.mar_id = marca_central.mar_id WHERE marca_central.mar_nombre = '" + req.query.central + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db1.end();
                IngresarError('Error', 'Buscar Modelo Central - Búsquedas Grandstream', err);
            } else {
                db1.end();

                res.render('administrador/adminBusquedasGrand', {
                    isAuthenticated: req.isAuthenticated(),
                    username: req.user,
                    modeloCentral: rows
                });
            }
        });
    },
    buscarDepartamentos: function (req, res, next) {

        var modeloCentralt = req.query.cbxModeloCentral;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT dep_id, dep_nombre FROM departamento INNER JOIN modelo_central ON departamento.cen_id = modelo_central.cen_id INNER JOIN marca_central ON modelo_central.mar_id = marca_central.mar_id WHERE modelo_central.cen_id = '" + modeloCentralt + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Departamento - Búsquedas Grandstream', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    buscarExtension: function (req, res, next) {

        var depar = req.query.cbxDepartamento;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM extension WHERE ext_estado != 0 AND dep_id = '" + depar + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Extensión - Búsquedas Grandstream', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    buscarLlamadasRealizadasGrand: function (req, res, next) {

        var fechaInicio = req.query.fechaInicio;
        var fechaFinal = req.query.fechaFinal;
        var extensiones = req.query.extensiones;
        var modeloCentral = req.query.modeloCentral;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_detalle_llamada_realizada_G ('" + fechaInicio + "','" + fechaFinal + "','" + extensiones + "','GRANDSTREAM','" + modeloCentral + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar detalle llamada realizada - Búsquedas Grandstream', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarLlamadasRealizadasResumenGrand: function (req, res, next) {

        var fechaInicio = req.query.fechaInicio;
        var fechaFinal = req.query.fechaFinal;
        var extensiones = req.query.extensiones;
        var modeloCentral = req.query.modeloCentral;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_resumen_llamada_realizada_G ('" + fechaInicio + "','" + fechaFinal + "','" + extensiones + "','GRANDSTREAM','" + modeloCentral + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar resumen llamada realizada - Búsquedas Grandstream', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    buscarLlamadasRecibidasGrand: function (req, res, next) {

        var fechaInicio = req.query.fechaInicio;
        var fechaFinal = req.query.fechaFinal;
        var extensiones = req.query.extensiones;
        var modeloCentral = req.query.modeloCentral;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_detalle_llamada_recibida_G ('" + fechaInicio + "','" + fechaFinal + "','" + extensiones + "','GRANDSTREAM','" + modeloCentral + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar detalle llamada recibida - Búsquedas Grandstream', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    buscarLlamadasRecibidasResumenGrand: function (req, res, next) {

        var fechaInicio = req.query.fechaInicio;
        var fechaFinal = req.query.fechaFinal;
        var extensiones = req.query.extensiones;
        var modeloCentral = req.query.modeloCentral;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_resumen_llamada_recibida_G ('" + fechaInicio + "','" + fechaFinal + "','" + extensiones + "','GRANDSTREAM','" + modeloCentral + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar resumen llamada recibida - Búsquedas Grandstream', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarLlamadasRealizadasRecibidasTotalGrand: function (req, res, next) {

        var fechaInicio = req.query.fechaInicio;
        var fechaFinal = req.query.fechaFinal;
        var extensiones = req.query.extensiones;
        var modeloCentral = req.query.modeloCentral;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_resumen_total_llamadas_realizadas_recibidas_G ('" + fechaInicio + "','" + fechaFinal + "','" + extensiones + "','" + modeloCentral + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar resumen llamada realizada - Búsquedas Grandstream', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    }
}