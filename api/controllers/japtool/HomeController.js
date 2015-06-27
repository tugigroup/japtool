/**
 * Created by TuyenTV1 on 6/22/2015.
 */
module.exports = {
//This loads index.ejs
    index: function(req, res){
        res.view({ layout: 'layout/japtool-home'});
    }
}
