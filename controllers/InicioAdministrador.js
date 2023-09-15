module.exports = {
    indexAdministrador: function (req, res, next) {

        res.render('administrador/adminIndex', {
            isAuthenticated: req.isAuthenticated(),
            username: req.user
        });
    }

}