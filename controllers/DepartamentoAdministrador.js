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
    getDepartamentoAdministrador: function (req, res, next) {

        res.render('administrador/adminDepartamento', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    },
    postGuardarDepartamento: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionDepartamento(?,?,?,?,?,?) AS msm",
            [1,
                null,
                req.body.nombre_dep,
                req.body.descripcion_dep,
                null,
                req.body.id_cen],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Guardar - Departamento', err);
                } else {
                    if (rows[0].msm === 'El departamento que desea ingresar ya Existe') {
                        res.sendStatus(500);
                        db.end();
                    } else {
                        res.send(true);
                        db.end();
                    }
                }
            });
    },
    postModificarDepartamento: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionDepartamento(?,?,?,?,?,?) AS msm",
            [2,
                req.body.id_departamento,
                req.body.nombre_dep,
                req.body.descripcion_dep,
                null,
                req.body.id_cen],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Modificar - Departamento', err);
                } else {
                    if (rows[0].msm === 'Departamento Modificado Exitosamente') {
                        res.send(true);
                        db.end();
                    } else {
                        res.sendStatus(500);
                        db.end();
                    }
                }
            });
    },

    postEliminarDepartamento: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionDepartamento(?,?,?,?,?,?) AS msm",
            [3,
                req.body.id_departamento,
                null,
                null,
                null,
                null],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Eliminar - Departamento', err);
                } else {
                    if (rows[0].msm === 'Departamento Eliminado Exitosamente') {
                        res.send(true);
                        db.end();
                    } else {
                        res.sendStatus(500);
                        db.end();
                    }
                }
            });
    },
    buscarDepartamento: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM buscar_departamento", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar - Departamento', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarCentral: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT modelo_central.cen_id AS 'value', modelo_central.cen_nombre AS 'text' FROM modelo_central", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar Modelo Central - Departamento', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    }
}