/**
 * Japtool/testController
 *
 * @description :: Server-side logic for managing japtool/tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    list: function(req, res){
        var condition = req.param('condition');
        Article.getLessonArticle({condition: condition}, function(err, articles){
            res.render('japtool/learning/learnArticle',
                {
                    data:articles,
                    layout:'layout/layout-japtool'
                }
            );
        })
    },
    getListArticle:function () {
        var arrArticleID = req.param('arrArticleID');
        console.log(arrArticleID.length);
    }
};

