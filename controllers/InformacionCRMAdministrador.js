
module.exports = {
    getInformacionCRMAdministrador: function (req, res, next) {

        res.render('administrador/adminCrmInformacion', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    }
}