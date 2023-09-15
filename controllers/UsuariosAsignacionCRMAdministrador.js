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
    getUsuariosCRMAdministrador: function (req, res, next) {

        res.render('administrador/adminCrmUsuarios', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    },
    buscarUsuarios: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT usu_id, usu_nombre FROM usuario INNER JOIN rol ON usuario.rol_id = rol.rol_id WHERE rol.rol_id = 2", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar Usuarios - Usuarios_Agentes CRM', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    buscarExtension: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT ext_id, ext_nombre, ext_numero FROM extension WHERE extension.ext_estado != 0", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Extensiones - Usuarios_Agentes CRM', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    asignarUsuarioExtension: function (req, res, next) {

        var usuario = req.body.usuario;
        var extension = req.body.extension;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionLlamadasAsignacion (?,?,?,?,?,?) AS msm", [1, extension, usuario, null, null, null],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Asignar - Usuarios_Agentes CRM', err);
                } else {
                    res.send(rows[0].msm);
                    db.end();
                }
            });
    }
}