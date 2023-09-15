var socket = io.connect();

socket.on('expiracion', function (datos) {
    console.log(datos);
    if (datos = 'EXPIRO') {
        swal({
            title: "Licencia Expirada",
            text: "Estimado Cliente la licencia de la aplicación a expirado,\n para más informacion contactese con la empresa proveedora.",
            type: "warning",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Aceptar",
            closeOnConfirm: false
        }, function () {
            location.replace('/logout');
        });
    }

});
