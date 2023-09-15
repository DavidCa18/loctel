var express = require('express');
var router = express.Router();
router.io = require('socket.io')();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('../middleware/auth');

router.get('/', function (req, res, next) {
    res.render('index');
});


//Páginas de Inicio
router.get('/registro', controllers.Usuario.getRegistroUsuario);
router.post('/registro', controllers.Usuario.postRegistroUsuario);
router.get('/inicio', controllers.Usuario.getIniciarSesion);
router.post('/inicio',
    passport.authenticate('local', {
        successRedirect: '/adminIndex',
        failureRedirect: '/inicio',
        failureFlash: true
    })
);
router.get('/logout', controllers.Usuario.cerrarSesion);

//Páginas del Administrador

//Administrador Index
router.get('/adminIndex', controllers.InicioAdministrador.indexAdministrador);

//Administrador Gestión Central Epygi Búsquedas - Estadísticas
router.get('/adminEstadisticasEpygi', AuthMiddleware.isLogged, controllers.EstadisticasEpygiAdministrador.getAdminEstadisticasEpygi);
router.get('/ResumenGlobalLlamadasEpygi', AuthMiddleware.isLogged, controllers.EstadisticasEpygiAdministrador.buscarResumenGlobal);
router.get('/TipoGlobalLlamadasEpygi', AuthMiddleware.isLogged, controllers.EstadisticasEpygiAdministrador.buscarTipoGlobal);
router.get('/TiempoGlobalLlamadasEpygi', AuthMiddleware.isLogged, controllers.EstadisticasEpygiAdministrador.buscarTiempoGlobal);

router.get('/adminBusquedasEpygi', AuthMiddleware.isLogged, controllers.BusquedasEpygiAdministrador.getbusquedasAdministradorEpigy);
router.get('/ExtensionesEpygi', AuthMiddleware.isLogged, controllers.BusquedasEpygiAdministrador.buscarExtension);
router.get('/DepartamentosEpygi', AuthMiddleware.isLogged, controllers.BusquedasEpygiAdministrador.buscarDepartamentos);
router.get('/LlamadasRealizadasEpygi', AuthMiddleware.isLogged, controllers.BusquedasEpygiAdministrador.buscarLlamadasRealizadasEpygi);
router.get('/LlamadasRealizadasResumenEpygi', AuthMiddleware.isLogged, controllers.BusquedasEpygiAdministrador.buscarLlamadasRealizadasResumenEpygi);
router.get('/LlamadasRecibidasEpygi', AuthMiddleware.isLogged, controllers.BusquedasEpygiAdministrador.buscarLlamadasRecibidasEpygi);
router.get('/LlamadasRecibidasResumenEpygi', AuthMiddleware.isLogged, controllers.BusquedasEpygiAdministrador.buscarLlamadasRecibidasResumenEpygi);
router.get('/LlamadasRealizadasTotal', AuthMiddleware.isLogged, controllers.BusquedasEpygiAdministrador.buscarResumenTotalLlamadasRealizadas);
router.get('/LlamadasRecibidasTotal', AuthMiddleware.isLogged, controllers.BusquedasEpygiAdministrador.buscarResumenTotalLlamadasRecibidas);

//Administrador de Búsquedas - Estadísticas Central GrandStream
router.get('/adminEstadisticasGrand', AuthMiddleware.isLogged, controllers.EstadisticasGrandAdministrador.getEstadisticasAdministradorGrand);
router.get('/ResumenGlobalLlamadasGrand', AuthMiddleware.isLogged, controllers.EstadisticasGrandAdministrador.buscarResumenGlobalGrand);
router.get('/TipoGlobalLlamadasGrand', AuthMiddleware.isLogged, controllers.EstadisticasGrandAdministrador.buscarTipoGlobalGrand);
router.get('/TiempoGlobalLlamadasGrand', AuthMiddleware.isLogged, controllers.EstadisticasGrandAdministrador.buscarTiempoGlobalGrand);

router.get('/adminBusquedasGrand', AuthMiddleware.isLogged, controllers.BusquedasGrandAdministrador.getBusquedasAdministradorGrand);
router.get('/ExtensionesGrand', AuthMiddleware.isLogged, controllers.BusquedasGrandAdministrador.buscarExtension);
router.get('/DepartamentosGrand', AuthMiddleware.isLogged, controllers.BusquedasGrandAdministrador.buscarDepartamentos);
router.get('/LlamadasRealizadasGrand', AuthMiddleware.isLogged, controllers.BusquedasGrandAdministrador.buscarLlamadasRealizadasGrand);
router.get('/LlamadasRecibidasGrand', AuthMiddleware.isLogged, controllers.BusquedasGrandAdministrador.buscarLlamadasRecibidasGrand);
router.get('/LlamadasRealizadasResumenGrand', AuthMiddleware.isLogged, controllers.BusquedasGrandAdministrador.buscarLlamadasRealizadasResumenGrand);
router.get('/LlamadasRecibidasResumenGrand', AuthMiddleware.isLogged, controllers.BusquedasGrandAdministrador.buscarLlamadasRecibidasResumenGrand);
router.get('/LlamadasRealizadasRecibidasTotalGrand', AuthMiddleware.isLogged, controllers.BusquedasGrandAdministrador.buscarLlamadasRealizadasRecibidasTotalGrand);

//Administrador Empresa
router.get('/adminEmpresa', AuthMiddleware.isLogged, controllers.EmpresaAdministrador.empresaAdministrador);
router.get('/BuscarEmpresa', AuthMiddleware.isLogged, controllers.EmpresaAdministrador.getBuscarEmpresa);
router.post('/GuardarEmpresa', AuthMiddleware.isLogged, controllers.EmpresaAdministrador.postRegistroEmpresa);

//Administrador Central Telefónica Modelo
router.get('/adminCentral', AuthMiddleware.isLogged, controllers.CentralAdministrador.getCentralAdministrador);
router.get('/ModeloCentral', AuthMiddleware.isLogged, controllers.CentralAdministrador.buscarModeloCentral);
router.get('/MarcaCentral', AuthMiddleware.isLogged, controllers.CentralAdministrador.buscarMarcaCentral);
router.post('/GuardarCentral', AuthMiddleware.isLogged, controllers.CentralAdministrador.postGuardarCentral);
router.post('/ModificarCentral', AuthMiddleware.isLogged, controllers.CentralAdministrador.postModificarCentral);
router.delete('/EliminarCentral', AuthMiddleware.isLogged, controllers.CentralAdministrador.postEliminarCentral);

//Administrador Central Telefónica Campos
router.get('/adminCentralCampos', AuthMiddleware.isLogged, controllers.CamposCentralAdministrador.getCentralCamposAdministrador);
router.post('/GuardarCentralCampos', AuthMiddleware.isLogged, controllers.CamposCentralAdministrador.postGuardarCamposCentral);
router.post('/EliminarCentralCampos', AuthMiddleware.isLogged, controllers.CamposCentralAdministrador.postEliminarCamposCentral);

//Administrador Departamentos
router.get('/adminDepartamento', AuthMiddleware.isLogged, controllers.DepartamentoAdministrador.getDepartamentoAdministrador);
router.get('/BuscarCentral', AuthMiddleware.isLogged, controllers.DepartamentoAdministrador.buscarCentral);
router.get('/BuscarDepartamento', AuthMiddleware.isLogged, controllers.DepartamentoAdministrador.buscarDepartamento);
router.post('/GuardarDepartamento', AuthMiddleware.isLogged, controllers.DepartamentoAdministrador.postGuardarDepartamento);
router.post('/ModificarDepartamento', AuthMiddleware.isLogged, controllers.DepartamentoAdministrador.postModificarDepartamento);
router.delete('/EliminarDepartamento', AuthMiddleware.isLogged, controllers.DepartamentoAdministrador.postEliminarDepartamento);

//Administrador Agentes
router.get('/adminAgentes', AuthMiddleware.isLogged, controllers.AgentesAdministrador.getAgentesAdministrador);
router.get('/BuscarDepartamentoA', AuthMiddleware.isLogged, controllers.AgentesAdministrador.buscarDepartamento);
router.get('/BuscarAgentes', AuthMiddleware.isLogged, controllers.AgentesAdministrador.buscarAgentes);
router.post('/GuardarAgentes', AuthMiddleware.isLogged, controllers.AgentesAdministrador.postGuardarAgente);
router.post('/ModificarAgentes', AuthMiddleware.isLogged, controllers.AgentesAdministrador.postModificarAgente);
router.delete('/EliminarAgentes', AuthMiddleware.isLogged, controllers.AgentesAdministrador.postEliminarAgente);

//Administrador Series Numéricas
router.get('/adminSeries', AuthMiddleware.isLogged, controllers.SeriesAdministrador.getSeriesAdministrador);
router.get('/BuscarOperadorasS', AuthMiddleware.isLogged, controllers.SeriesAdministrador.buscarOperadoras);
router.get('/BuscarNombreOperadora', AuthMiddleware.isLogged, controllers.SeriesAdministrador.buscarNombreOperadora);
router.get('/BuscarPrivinciaOperadora', AuthMiddleware.isLogged, controllers.SeriesAdministrador.buscarProvinciaOperadora);
router.get('/BuscarTipoOperadora', AuthMiddleware.isLogged, controllers.SeriesAdministrador.buscarTipoOperadora);
router.post('/GuardarSerie', AuthMiddleware.isLogged, controllers.SeriesAdministrador.postGuardarSerie);
router.post('/ModificarSerie', AuthMiddleware.isLogged, controllers.SeriesAdministrador.postModificarSerie);
router.delete('/EliminarSerie', AuthMiddleware.isLogged, controllers.SeriesAdministrador.postEliminarSerie);

//Administrador Usuarios
router.get('/adminUsuarios', AuthMiddleware.isLogged, controllers.UsuariosAdministrador.getUsuariosAdministrador);
router.get('/BuscarUsuariosA', AuthMiddleware.isLogged, controllers.UsuariosAdministrador.buscarUsuarios);
router.get('/BuscarRol', AuthMiddleware.isLogged, controllers.UsuariosAdministrador.buscarRol);
router.post('/GuardarUsuarioA', AuthMiddleware.isLogged, controllers.UsuariosAdministrador.postGuardarUsuario);
router.post('/ModificarUsuarioA', AuthMiddleware.isLogged, controllers.UsuariosAdministrador.postModificarUsuario);
router.delete('/EliminarUsuarioA', AuthMiddleware.isLogged, controllers.UsuariosAdministrador.postEliminarUsuario);

//Administrador CRM Información
router.get('/adminCrmInformacion', AuthMiddleware.isLogged, controllers.InformacionCRMAdministrador.getInformacionCRMAdministrador);

//Administrador CRM Campos
router.get('/adminCrmCreacionCampos', AuthMiddleware.isLogged, controllers.CamposCRMAdministrador.camposCRMAdministrador);
router.get('/BuscarCamposAsignacionLlamadas', AuthMiddleware.isLogged, controllers.CamposCRMAdministrador.buscarCamposAsignacionLlamadas);
router.post('/AgregarCamposAsignacionLlamadas', AuthMiddleware.isLogged, controllers.CamposCRMAdministrador.agregarCamposAsignacionLlamadas);
router.delete('/EliminarCamposAsignacionLlamadas', AuthMiddleware.isLogged, controllers.CamposCRMAdministrador.eliminarCamposAsignacionLlamadas);
router.get('/ComprobarAsignacionLlamadas', AuthMiddleware.isLogged, controllers.CamposCRMAdministrador.comporbarAsignacionLlamadas);

//Administrador CRM Asignación
router.get('/adminCrmAsignacion', AuthMiddleware.isLogged, controllers.AsignacionCRMAdministrador.asignacionCRMAdministrador);
router.get('/BuscarMarcaCentralCrmAsignacion', AuthMiddleware.isLogged, controllers.AsignacionCRMAdministrador.buscarMarcaCentral);
router.get('/BuscarModeloCentralCrmAsignacion', AuthMiddleware.isLogged, controllers.AsignacionCRMAdministrador.buscarModeloCentral);
router.get('/BuscarAgentesCrmAsignacion', AuthMiddleware.isLogged, controllers.AsignacionCRMAdministrador.buscarExtension);
router.post('/GuardarArchivoCrmAsignacion', AuthMiddleware.isLogged, controllers.AsignacionCRMAdministrador.guardarArchivoAsigancionLlamadas);
router.post('/GuardarCrmAsignacion', AuthMiddleware.isLogged, controllers.AsignacionCRMAdministrador.guardarAsignacionLlamadas);

//Administrador CRM Consultas
router.get('/adminCrmConsultas', AuthMiddleware.isLogged, controllers.ConsultasCRMAdministrador.getConsultasCRMAdministrador);
router.get('/BuscarMarcaCentralConsultasCrm', AuthMiddleware.isLogged, controllers.ConsultasCRMAdministrador.buscarMarcaCentral);
router.get('/BuscarModeloCentralConsultasCrm', AuthMiddleware.isLogged, controllers.ConsultasCRMAdministrador.buscarModeloCentral);
router.get('/BuscarDepartamentoConsultasCrm', AuthMiddleware.isLogged, controllers.ConsultasCRMAdministrador.buscarDepartamentos);
router.get('/BuscarExtensionConsultasCrm', AuthMiddleware.isLogged, controllers.ConsultasCRMAdministrador.buscarExtension);
router.get('/BuscarLlamadasAsignacionConsultasCrm', AuthMiddleware.isLogged, controllers.ConsultasCRMAdministrador.buscarAsignacionLlamadas);

//Administrador CRM Usuarios
router.get('/adminCrmUsuarios', AuthMiddleware.isLogged, controllers.UsuariosAsignacionCRMAdministrador.getUsuariosCRMAdministrador);
router.get('/BuscarUsuariosCrmUsuarios', AuthMiddleware.isLogged, controllers.UsuariosAsignacionCRMAdministrador.buscarUsuarios);
router.get('/BuscarExtensionesCrmUsuarios', AuthMiddleware.isLogged, controllers.UsuariosAsignacionCRMAdministrador.buscarExtension);
router.post('/GuardarAsignacionCrmUsuarios', AuthMiddleware.isLogged, controllers.UsuariosAsignacionCRMAdministrador.asignarUsuarioExtension);

//Usuario Inicio
router.get('/usuarioInicio', AuthMiddleware.isLogged, controllers.InicioUsuario.getInicioUsuario);
router.get('/BuscarAsignacionLlamadasUsuario', AuthMiddleware.isLogged, controllers.InicioUsuario.buscarAsignacionLlamadas);
router.post('/GuardarComentarioAsignacionLlamadasUsuario', AuthMiddleware.isLogged, controllers.InicioUsuario.guardarComentarioAsignacionLlamadas);
router.post('/GuardarEstadoAsignacionLlamadasUsuario', AuthMiddleware.isLogged, controllers.InicioUsuario.guardarEstadoAsignacionLlamadas);

//Auditoria de datos
router.get('/adminAuditoria', AuthMiddleware.isLogged, controllers.AuditoriaAdministrador.getAuditoria);
router.get('/BuscarAuditoria', AuthMiddleware.isLogged, controllers.AuditoriaAdministrador.buscarAuditoria);

//Auditoria de datos
router.get('/adminErrores', AuthMiddleware.isLogged, controllers.ErroresAdministrador.getErrores);
router.get('/BuscarLogErrores', AuthMiddleware.isLogged, controllers.ErroresAdministrador.buscarErrores);

//Live CDR 
//router.get('/adminLiveCdr', AuthMiddleware.isLogged, controllers.LiveCDRAdministrador.getLiveCDRAdministrador);
//router.get('/APILiveCdr', AuthMiddleware.isLogged, controllers.LiveCDRAdministrador.api);

//Comprobación de licencia
router.get('/GuardarLicenciaAPI', controllers.LicenciaAdministrador.guardarLicenciaAPI);
router.get('/ComprobarLicenciaAPI', controllers.LicenciaAdministrador.comprobarLicenciaAPI);
router.get('/ExpirarLicenciaAPI', controllers.LicenciaAdministrador.expirarLicenciaAPI);
router.get('/GuardarLicenciaDB', controllers.LicenciaAdministrador.guardarLicenciaDB);
router.get('/BuscarLicenciaDB', controllers.LicenciaAdministrador.buscarLicenciaDB);
router.get('/EliminarLicenciaDB', controllers.LicenciaAdministrador.eliminarLicenciaDB);
router.get('/BuscarNumeroLicenciaDB', controllers.LicenciaAdministrador.buscarNumeroLicenciaDB);
router.get('/RollbackGuardarLicenciaAPI', controllers.LicenciaAdministrador.rollbackLicenciaAPI);

var schedule = require('node-schedule');


router.io.on('connection', function (socket) {

    var j = schedule.scheduleJob(' */1 * * * *', function () {
        var LicenciaLocal = controllers.LicenciaAdministrador.buscarLicenciaCallBackDB('', function (dato) {
            var ComprobacionExpiracion = controllers.LicenciaAdministrador.expirarLicenciaCallBackAPI((dato[0].msm), function (data) {

                if (data[0].msm != 'VIGENTE') {
                    var ComprobacionExpiracion = controllers.LicenciaAdministrador.eliminarLicenciaCallBackDB((dato[0].msm), function (datos) {
                        console.log(datos[0].msm);
                        expiro(datos[0].msm);
                    });
                } else {
                    console.log(data[0].msm);
                }

            });
        });
    });

    function expiro(mensaje) {
        socket.emit('expiracion', mensaje);
    }
});
module.exports = router;