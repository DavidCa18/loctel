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

    getCentralAdministrador: function (req, res, next) {

        res.render('administrador/adminCentral', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    },
    postGuardarCentral: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionCentral(?,?,?,?,?,?,?,?,?) AS msm",
            [1,
                null,
                req.body.nombre_cen,
                req.body.tipo_archivo_cen,
                req.body.separador_cen,
                req.body.ruta_cen,
                req.body.formato_fecha_cen,
                req.body.num_provincia_cen,
                req.body.id_centralMarca],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Guardar- Modelo Central', err);
                } else {
                    if (rows[0].msm === 'La Central que Desea Registrar ya Existe') {
                        res.sendStatus(500);
                        db.end();
                    } else {
                        res.send(true);
                        db.end();
                    }
                }
            });
    },
    postModificarCentral: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionCentral(?,?,?,?,?,?,?,?,?) AS msm",
            [2,
                req.body.id_cen,
                req.body.nombre_cen,
                req.body.tipo_archivo_cen,
                req.body.separador_cen,
                req.body.ruta_cen,
                req.body.formato_fecha_cen,
                req.body.num_provincia_cen,
                req.body.id_centralMarca],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Modificar - Modelo Central', err);
                } else {
                    if (rows[0].msm === 'La Central fue Modificada Exitosamente') {
                        res.send(true);
                        db.end();
                    } else {
                        res.sendStatus(500);
                        db.end();
                    }
                }
            });
    },

    postEliminarCentral: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionCentral(?,?,?,?,?,?,?,?,?) AS msm",
            [3,
                req.body.id_cen,
                req.body.nombre_cen,
                req.body.tipo_archivo_cen,
                req.body.separador_cen,
                req.body.ruta_cen,
                req.body.formato_fecha_cen,
                req.body.num_provincia_cen,
                req.body.id_centralMarca],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Eliminar - Modelo Central', err);
                } else {
                    if (rows[0].msm === 'La Central fue Eliminada Exitosamente') {
                        res.send(true);
                        db.end();
                    } else {
                        res.sendStatus(500);
                        db.end();
                    }
                }
            });
    },


    buscarModeloCentral: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM buscar_central", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar - Modelo Central', err);
            } else {

                res.send(rows);
                db.end();
            }
        });
    },

    buscarMarcaCentral: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT marca_central.mar_id AS 'value', marca_central.mar_nombre AS 'text' FROM marca_central", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar Marca Central - Modelo Central', err);
            } else {

                res.send(rows);
                db.end();
            }
        });
    }

}