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
    getAdminEstadisticasEpygi: function (req, res, next) {

        var db1 = mysql.createConnection(config);
        db1.connect();

        db1.query("SELECT cen_id, cen_nombre FROM modelo_central INNER JOIN marca_central ON modelo_central.mar_id = marca_central.mar_id WHERE marca_central.mar_nombre = '" + req.query.central + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db1.end();
                IngresarError('Error', 'Buscar Modelo Central - Estadísticas Epygi', err);
            } else {
                db1.end();

                var db = mysql.createConnection(config);
                db.connect();

                db.query("SELECT DISTINCT YEAR(llamada.lla_fecha) AS 'anio' FROM llamada WHERE YEAR(llamada.lla_fecha) != 1999", function (err, rows2, fields) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                        db.end();
                        IngresarError('Error', 'Buscar Años - Estadísticas Epygi', err);
                    } else {
                        
                        db.end();
                        res.render('administrador/adminEstadisticasEpygi', {
                            isAuthenticated: req.isAuthenticated(),
                            username: req.user,
                            modeloCentral: rows,
                            aniosBusqueda : rows2
                        });

                    }
                });
            }
        });
    },

    buscarResumenGlobal: function (req, res, next) {

        var modelo_central = req.query.modelo_central;
        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_resumen_global_E_G('" + modelo_central + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Resumen Globlal - Estadísticas Epygi', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarTipoGlobal: function (req, res, next) {

        var modelo_central = req.query.modelo_central;
        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_tipo_llamada_global_E_G('" + modelo_central + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Tipo Llamadas - Estadísticas Epygi', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarTiempoGlobal: function (req, res, next) {

        var modelo_central = req.query.modelo_central;
        var anio_busqueda = req.query.anio_busqueda;
        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_tiempo_llamadas_mes_E_G('" + modelo_central + "'," + anio_busqueda + ")", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Tiempo Llamada - Estadísticas Epygi', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    }

}