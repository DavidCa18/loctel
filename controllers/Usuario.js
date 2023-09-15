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
    getRegistroUsuario: function (req, res, next) {
        return res.render('registro');
    },

    getIniciarSesion: function (req, res, next) {
        return res.render('inicio', { authmessage: req.flash('authmessage') });
    },

    postRegistroUsuario: function (req, res, next) {

        var user = {
            usuario_usu: req.body.txtUsuario,
            pin_usu: req.body.txtPassword
        };
        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionUsuario("
            + "'1',"
            + "null,"
            + "'" + user.usuario_usu + "',"
            + "'" + user.pin_usu + "',"
            + "null"
            + ") AS msm", function (err, rows, fields) {

                if (err) {
                    console.log(err);
                    db.end();
                    IngresarError('Error', 'Buscar Usuario - Inicio Sesión', err);
                } else {
                    res.send(rows);
                    db.end();
                }
            });
    },

    cerrarSesion: function (req, res, next) {
        req.logout();
        res.redirect('/inicio');
    }

}