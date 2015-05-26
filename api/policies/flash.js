/**
 * Created by TuyenTV1 on 5/26/2015.
 */
module.exports = function(req,res,next){
    res.locals.flash ={};
    if(!req.session.flash){
        return next();
    }
    res.locals.flash = _.clone(req.session.flash);

    //clear flash
    req.session.flash ={};
    next();
}