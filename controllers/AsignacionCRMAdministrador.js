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

    asignacionCRMAdministrador: function (req, res, next) {
        res.render('administrador/adminCrmAsignacion', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    },
    guardarAsignacionLlamadas: function (req, res, next) {

        var valores = req.body.valores;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("INSERT INTO `asignacion_llamada` (`asl_apellidos`, `asl_nombre`, `asl_direccion`, `asl_poblacion`, `asl_telefono`, `asl_email`, `asl_deuda`, `asl_genero`, `asl_ingresos_mensuales`,`ext_id`) VALUES  " + valores + "", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Guardar Asignacion Llamadas CRM', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarMarcaCentral: function (req, res, next) {

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT mar_id, mar_nombre FROM marca_central", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar Marca Central Asignacion Llamadas CRM', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },
    buscarModeloCentral: function (req, res, next) {

        var marca = req.query.marca;
        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT cen_id, cen_nombre FROM modelo_central WHERE modelo_central.mar_id = '" + marca + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                db.end();
                IngresarError('Error', 'Buscar Modelo Central Asignacion Llamadas CRM', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    buscarExtension: function (req, res, next) {

        var modelo = req.query.modelo;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT ext_id, ext_nombre, ext_numero FROM extension INNER JOIN departamento ON extension.dep_id = departamento.dep_id INNER JOIN modelo_central ON departamento.cen_id = modelo_central.cen_id WHERE modelo_central.cen_id = '" + modelo + "'", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Extensión Asignacion Llamadas CRM', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    guardarArchivoAsigancionLlamadas: function (req, res, next) {

        var archivo = req.body.archivo;
        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionArchivoAsignacion(?,?) AS msm", [1,
            archivo],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Guardar Archivo Asignacion Llamadas CRM', err);
                } else {
                    res.send(rows);
                    db.end();
                }
            });
    }

}