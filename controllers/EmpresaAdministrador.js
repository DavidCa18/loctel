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
    empresaAdministrador: function (req, res, next) {
        res.render('administrador/adminEmpresa', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    },

    getBuscarEmpresa: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT * FROM buscar_empresa", function (err, rows, fields) {

            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar - Empresa', err);
            } else {
                res.send(rows);
                db.end();
            }

        });
    },

    postRegistroEmpresa: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionEmpresa(?,?,?,?,?) AS msm",
            [1,
                req.body.txtRazonSocial,
                req.body.txtRuc,
                req.body.txtDireccion,
                req.body.txtTelefono],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Guardar - Empresa', err);
                } else {
                    res.send(rows[0].msm);
                    db.end();
                }
            });
    }
}