/**
 * Created by Dulv on 7/27/2015.
 */
module.exports = function(req, res, next) {

  	// set languge for interface
	if ( req.param('lang') ) {
	    req.session.lang = req.param('lang');
	}

	req.setLocale(req.session.lang);

	// pre check validate
	res.locals.flash ={};
    if(!req.session.flash){
        return next();
    }
    res.locals.flash = _.clone(req.session.flash);

    //clear flash
    req.session.flash ={};

  	next();
};