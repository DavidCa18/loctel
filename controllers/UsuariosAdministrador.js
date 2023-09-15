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
    getUsuariosAdministrador: function (req, res, next) {

        res.render('administrador/adminUsuarios', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    },

    postGuardarUsuario: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionUsuario(?,?,?,?,?) AS msm",
            [1,
                null,
                req.body.nombre_usu,
                req.body.pin_usu,
                req.body.id_rol],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Guardar - Usuarios', err);
                } else {

                    if (rows[0].msm === 'El Usuario que intenta Registrar ya Existe') {
                        res.sendStatus(500);
                        db.end();
                    } else {
                        res.send(true);
                        db.end();
                    }

                }
            });
    },
    postModificarUsuario: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionUsuario(?,?,?,?,?) AS msm",
            [2,
                req.body.id_usuario,
                req.body.nombre_usu,
                req.body.pin_usu,
                req.body.id_rol],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Modificar - Usuarios', err);
                } else {

                    if (rows[0].msm === 'Usuario Modificado Exitosamente') {
                        res.send(true);
                        db.end();
                    } else {
                        res.sendStatus(500);
                        db.end();
                    }

                }
            });
    },

    postEliminarUsuario: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionUsuario(?,?,?,?,?) AS msm",
            [3,
                req.body.id_usuario,
                null,
                null,
                null],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Eliminar - Usuarios', err);
                } else {

                    if (rows[0].msm === 'Usuario Eliminado Exitosamente') {
                        res.send(true);
                        db.end();
                    } else {
                        res.sendStatus(500);
                        db.end();
                    }

                }
            });
    },
    buscarUsuarios: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM buscar_usuarios_", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar - Usuarios', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarRol: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT rol.rol_id AS 'value', rol.rol_nombre AS 'text' FROM rol", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar Rol - Usuarios', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    }
}