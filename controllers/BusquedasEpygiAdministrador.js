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

    getbusquedasAdministradorEpigy: function (req, res, next) {

        var db1 = mysql.createConnection(config);
        db1.connect();

        db1.query("SELECT cen_id, cen_nombre FROM modelo_central INNER JOIN marca_central ON modelo_central.mar_id = marca_central.mar_id WHERE marca_central.mar_nombre = '" + req.query.central + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db1.end();
                IngresarError('Error', 'Buscar Modelo Central - Búsquedas Epygi', err);
            } else {
                db1.end();

                res.render('administrador/adminBusquedasEpygi', {
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
                IngresarError('Error', 'Buscar Departamentos - Búsquedas Epygi', err);
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
                IngresarError('Error', 'Buscar Extensión - Búsquedas Epygi', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarLlamadasRealizadasEpygi: function (req, res, next) {

        var fechaInicio = req.query.fechaInicio;
        var fechaFinal = req.query.fechaFinal;
        var extensiones = req.query.extensiones;
        var modeloCentral = req.query.modeloCentral;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_detalle_llamada_realizada_E ('" + fechaInicio + "','" + fechaFinal + "','" + extensiones + "','EPYGI','" + modeloCentral + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar detalle llamadas realizadas - Búsquedas Epygi', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    buscarLlamadasRecibidasEpygi: function (req, res, next) {

        var fechaInicio = req.query.fechaInicio;
        var fechaFinal = req.query.fechaFinal;
        var extensiones = req.query.extensiones;
        var modeloCentral = req.query.modeloCentral;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_detalle_llamada_recibida_E ('" + fechaInicio + "','" + fechaFinal + "','" + extensiones + "','EPYGI','" + modeloCentral + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar detalle llamadas recibidas - Búsquedas Epygi', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarLlamadasRealizadasResumenEpygi: function (req, res, next) {

        var fechaInicio = req.query.fechaInicio;
        var fechaFinal = req.query.fechaFinal;
        var extensiones = req.query.extensiones;
        var modeloCentral = req.query.modeloCentral;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_resumen_llamada_realizada_E ('" + fechaInicio + "','" + fechaFinal + "','" + extensiones + "','EPYGI','" + modeloCentral + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar resumen llamadas realizadas - Búsquedas Epygi', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    buscarLlamadasRecibidasResumenEpygi: function (req, res, next) {

        var fechaInicio = req.query.fechaInicio;
        var fechaFinal = req.query.fechaFinal;
        var extensiones = req.query.extensiones;
        var modeloCentral = req.query.modeloCentral;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_resumen_llamada_recibida_E ('" + fechaInicio + "','" + fechaFinal + "','" + extensiones + "','EPYGI','" + modeloCentral + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar resumen llamadas recibidas - Búsquedas Epygi', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarResumenTotalLlamadasRealizadas: function (req, res, next) {

        var fechaInicio = req.query.fechaInicio;
        var fechaFinal = req.query.fechaFinal;
        var extensiones = req.query.extensiones;
        var modeloCentral = req.query.modeloCentral;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_resumen_total_llamadas_realizadas_E ('" + fechaInicio + "','" + fechaFinal + "','" + extensiones + "','" + modeloCentral + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar resumen totlal llamadas realizadas - Búsquedas Epygi', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarResumenTotalLlamadasRecibidas: function (req, res, next) {

        var fechaInicio = req.query.fechaInicio;
        var fechaFinal = req.query.fechaFinal;
        var extensiones = req.query.extensiones;
        var modeloCentral = req.query.modeloCentral;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_resumen_total_llamadas_recibidas_E ('" + fechaInicio + "','" + fechaFinal + "','" + extensiones + "','" + modeloCentral + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar resumen total llamadas recibidas - Búsquedas Epygi', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    }

}