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

    getCentralCamposAdministrador: function (req, res, next) {

        var db1 = mysql.createConnection(config);
        db1.connect();

        db1.query("SELECT * FROM buscar_central_campos", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db1.end();
                IngresarError('Error', 'Buscar Campo - Campos Central', err);
            } else {
                db1.end();

                res.render('administrador/adminCentralCampos', {
                    isAuthenticated: req.isAuthenticated(),
                    username: req.user,
                    datosCentral: rows
                });
            }
        });
    },
    postGuardarCamposCentral: function (req, res, next) {

        var campos = {
            id_campo_modelo: req.body.txtIdModelo,
            uno_campos: req.body.cbxCampoUno
        };

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionCampos("
            + "'1',"
            + "'" + campos.id_campo_modelo + "',"
            + "'" + campos.uno_campos[0] + "',"
            + "'" + campos.uno_campos[1] + "',"
            + "'" + campos.uno_campos[2] + "',"
            + "'" + campos.uno_campos[3] + "',"
            + "'" + campos.uno_campos[4] + "',"
            + "'" + campos.uno_campos[5] + "',"
            + "'" + campos.uno_campos[6] + "'"
            + ") AS msm", function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Guardar Campos - Campos Central', err);
                } else {
                    if (rows[0].msm === 'Error al asignar los campos') {
                        res.send(rows);
                        db.end();
                    } else {
                        res.send(rows);
                        db.end();
                    }
                }
            });
    },

    postEliminarCamposCentral: function (req, res, next) {

        var campos = {
            id_campo_modelo: req.body.id_campo_modelo,
        };

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionCampos("
            + "'2',"
            + "'" + campos.id_campo_modelo + "',"
            + "null,"
            + "null,"
            + "null,"
            + "null,"
            + "null,"
            + "null,"
            + "null"
            + ") AS msm", function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Eliminar Campos - Campos Central', err);
                } else {
                    res.send(rows);
                    db.end();
                }
            });
    }

}
