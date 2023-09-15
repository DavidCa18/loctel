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

    getSeriesAdministrador: function (req, res, next) {

        res.render('administrador/adminSeries', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    },

    postGuardarSerie: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionOperadora(?,?,?,?,?,?,?,?) AS msm",
            [1,
                null,
                req.body.numeracion_operadora,
                req.body.inicio_serie_operadora,
                req.body.fin_serie_operadora,
                req.body.id_tipo,
                req.body.id_nombre,
                req.body.id_provincia],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Guardar - Series Numéricas', err);
                } else {

                    if (rows[0].msm === 'Serie Numérica Guardada Exitosamente') {
                        res.send(true);
                        db.end();
                    } else {
                        res.sendStatus(500);
                        db.end();
                    }

                }
            });
    },

    postModificarSerie: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionOperadora(?,?,?,?,?,?,?,?) AS msm",
            [2,
                req.body.id_operadora,
                req.body.numeracion_operadora,
                req.body.inicio_serie_operadora,
                req.body.fin_serie_operadora,
                req.body.id_tipo,
                req.body.id_nombre,
                req.body.id_provincia],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Modificar - Series Numéricas', err);
                } else {

                    if (rows[0].msm === 'Serie Numérica Modificada Exitosamente') {
                        res.send(true);
                        db.end();
                    } else {
                        res.sendStatus(500);
                        db.end();
                    }

                }
            });
    },

    postEliminarSerie: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionOperadora(?,?,?,?,?,?,?,?) AS msm",
            [3,
                req.body.id_operadora,
                null,
                null,
                null,
                null,
                null,
                null],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Eliminar - Series Numéricas', err);
                } else {

                    if (rows[0].msm === 'Serie Numérica Eliminada Exitosamente') {
                        res.send(true);
                        db.end();
                    } else {
                        res.sendStatus(500);
                        db.end();
                    }

                }
            });
    },
    buscarOperadoras: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM buscar_operadora", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar - Series Numéricas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarNombreOperadora: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT nombre_ope.nom_id AS 'value', nombre_ope.nom_nombre AS 'text' FROM nombre_ope", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar Nombre Operadora - Series Numéricas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarProvinciaOperadora: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT provincia_ope.pro_id AS 'value', provincia_ope.pro_nombre AS 'text' FROM provincia_ope", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar Provincia Operadora - Series Numéricas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarTipoOperadora: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT tipo_ope.tip_id AS 'value', tipo_ope.tip_nombre AS 'text' FROM tipo_ope", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar Tipo Operadora - Series Numéricas', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    }
}
