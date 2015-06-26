/**
 * Created by TuyenTV1 on 6/23/2015.
 */
module.exports = {
//This loads index.ejs
    index: function(req, res){
        res.view({ layout: 'layout/japtool-library'});
    },
    libraryCategory:function(req,res){
        res.view('japtool/library/libraryCategory',{ layout: 'layout/japtool-library'});
    }

}
