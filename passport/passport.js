var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var config = require('.././database/database.js');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, function (req, username, password, done) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionUsuario("
            + "'5',"
            + "null,"
            + "'" + username + "',"
            + "'" + password + "',"
            + "null"
            + ") AS msm", function (err, rows, fields) {
                if (err) throw err;
                db.end();

                var user = rows[0].msm;
                var nombreUsuario = username;
                if (user === '0') {
                    return done(null, false, req.flash('authmessage', 'Credenciales Incorrectas'));
                } else {

                    var db2 = mysql.createConnection(config);
                    db2.connect();

                    db2.query("SELECT * FROM buscar_usuarios WHERE nombreUsuario = '" + nombreUsuario + "'", function (err, rows2, fields) {
                        if (err) throw err;
                        db2.end();

                        var user = rows2[0];
                        console.log(rows2[0]);
                        return done(null, {
                            idUsuario: user.idUsuario,
                            nombreUsuario: user.nombreUsuario,
                            idRol: user.idRol,
                            nombreRol: user.nombreRol,
                            nombreCentral: user.nombreCentral,
                            extension: user.extensionUsuario
                        });

                    });
                }
            });
    }));

};