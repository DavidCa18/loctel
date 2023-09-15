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
    getInicioUsuario: function (req, res, next) {

        res.render('usuario/usuarioInicio', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    },
    buscarAsignacionLlamadas: function (req, res, next) {

        var extensiones = req.query.extensiones;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("CALL buscar_detalles_llamadas_asignadas ('" + extensiones + "')", function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                db.end();
                IngresarError('Error', 'Buscar Llamadas Asignadas - Agente CRM', err);
            } else {
                res.send(rows);
                db.end();
            }
        });
    },

    guardarComentarioAsignacionLlamadas: function (req, res, next) {

        var comentario = req.body.comentario;
        var id_asignacion_llamada = req.body.id_asignacion_llamada;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionLlamadasAsignacion (?,?,?,?,?,?) AS msm", [2, null, null, id_asignacion_llamada, comentario, null],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Guardar Comentario - Agente CRM', err);
                } else {
                    res.send(rows[0].msm);
                    db.end();
                }
            });
    },
    guardarEstadoAsignacionLlamadas: function (req, res, next) {

        var estado = req.body.estado;
        var id_asignacion_llamada = req.body.id_asignacion_llamada;

        var db = mysql.createConnection(config);
        db.connect();

        db.query("SELECT GestionLlamadasAsignacion (?,?,?,?,?,?) AS msm", [3, null, null, id_asignacion_llamada, null, estado],
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    db.end();
                    IngresarError('Error', 'Guardar Estado - Agente CRM', err);
                } else {
                    res.send(rows[0].msm);
                    db.end();
                }
            });
    }
}