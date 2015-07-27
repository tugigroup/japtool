/**
 * Created by Dulv on 7/27/2015.
 */
module.exports = function(req, res, next) {
  	//req.setLocale(req.session.languagePreference);
  	// set languge for interface
	if ( req.param('lang') ) {
	    req.session.lang = req.param('lang');
	}

	req.setLocale(req.session.lang);

  	next();
};