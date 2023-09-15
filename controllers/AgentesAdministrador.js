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
    getAgentesAdministrador: function (req, res, next) {

        res.render('administrador/adminAgentes', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    },
    postGuardarAgente: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionExtension(?,?,?,?,?,?) AS msm",
            [1,
                null,
                req.body.nombre_ext,
                req.body.numero_ext,
                null,
                req.body.id_dep],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    IngresarError('Error', 'Guardar Extensión', err);
                    db.end();
                } else {
                    if (rows[0].msm === 'La extensión que desea ingresar ya existe') {
                        res.sendStatus(500);
                        db.end();
                    } else {
                        res.send(true);
                        db.end();
                    }
                }
            });
    },

    postModificarAgente: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionExtension(?,?,?,?,?,?) AS msm",
            [2,
                req.body.id_ext,
                req.body.nombre_ext,
                req.body.numero_ext,
                null,
                req.body.id_dep],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    IngresarError('Error', 'Modificar Extensión', err);
                    db.end();
                } else {
                    if (rows[0].msm === 'Extensión Modificada Exitosamente') {
                        res.send(true);
                        db.end();
                    } else {
                        res.sendStatus(500);
                        db.end();
                    }
                }
            });
    },

    postEliminarAgente: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionExtension(?,?,?,?,?,?) AS msm",
            [3,
                req.body.id_ext,
                null,
                null,
                null,
                null],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    IngresarError('Error', 'Eliminar Extensión', err);
                    db.end();
                } else {

                    if (rows[0].msm === 'Extensión Eliminada Exitosamente') {
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

        db.query("SELECT departamento.dep_id AS 'value', departamento.dep_nombre AS 'text' FROM departamento", function (err, rows, fields) {
            if (err) {
                console.log(err);
                IngresarError('Error', 'Buscar Departamento - Extensión', err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarAgentes: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM buscar_agentes", function (err, rows, fields) {
            if (err) {
                console.log(err);
                IngresarError('Error', 'Buscar Extensión', err);
                db.end();
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

}