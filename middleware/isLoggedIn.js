function isLoggedIn(req, res, next) {
	if (req.session.loggedinUser) {
		next();
	} else {
		res.redirect('/users/login');
	}
}

module.exports = isLoggedIn;
