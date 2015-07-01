/**
 * Created by TuyenTV1 on 6/26/2015.
 */

module.exports = {
    //This loads index.ejs
    index: function(req, res){
        res.view({ layout: 'layout/japtool-Learning'});
    },
    learning:function(req,res){
        res.view('japtool/learning/learning',{layout: 'layout/layout-japtool'});
    },
    create:function(req,res){
        res.view('japtool/learning/create',{layout: 'layout/layout-japtool'});
    },
    edit:function(req,res){
        res.view('japtool/learning/edit',{layout: 'layout/layout-japtool'});
    }

};