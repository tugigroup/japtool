/**
 * Japtool/testController
 *
 * @description :: Server-side logic for managing japtool/tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    list: function(req, res){
        var condition = req.param('condition');
        //var condition = '{"level": "N3", "tag" : {"contains":",1991,grammar,"}}';
        Article.getLessonArticle({condition: condition}, function(err, articles){
            res.render('japtool/learning/learnArticle',
                {
                    data:articles,
                    layout:'layout/layout-japtool'
                }
            );
        })
    }
};

