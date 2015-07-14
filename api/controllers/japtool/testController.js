/**
 * Japtool/testController
 *
 * @description :: Server-side logic for managing japtool/tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    list: function (req, res) {
        var condition = req.param('condition');
        Article.getLessonArticle({condition: condition}, function(err, articles){
            res.render('japtool/learning/learnArticle',
                {
                    data: articles,
                    layout: 'layout/layout-japtool'
                }
            );
        })
    },
    checkAnsUser: function (req, res) {

        var dataUserAns = req.param('dataUserAns');
        var JsondataUserAns = JSON.parse(dataUserAns);
        var arrArticleID = req.param('arrArticleID');
        var listResult = [];
        var listQuesEmpty = [];

        var data = [];

        var lengthQues = req.param('lengthQues');
        var listQues = [];
        for (var i = 0; i < arrArticleID.length; i++) {
            Article.findOne({id: arrArticleID[i]}).exec(function found(err, foudAr) {
                if (err) {
                    res.send(err);
                }
                Question.find({article: foudAr.id}).exec(function foundAllQue(err, questions) {
                    if (err) {
                        res.send(500);
                    }
                    questions.forEach(function (q){
                        listQues.push(q);
                    });
                    // if catch enough question in database
                    if (lengthQues == listQues.length) {
                        for (var k = 0; k < JsondataUserAns.length; k++) {
                            for (var j = 0; j < listQues.length; j++) {
                                // if user choiced this option
                                if (JsondataUserAns[k].UserOp != undefined && JsondataUserAns[k].idQues == listQues[j].id) {
                                    // check User answers
                                    if (listQues[j].key == 1 && listQues[j].option1 == JsondataUserAns[k].UserOp) {
                                        listResult.push({
                                            'ofArticle': JsondataUserAns[k].ofArticle,
                                            'ofQues': listQues[j].id,
                                            'QuesContent': listQues[j].question,
                                            'UserOp':JsondataUserAns[k].UserOp,
                                            'positionRd':JsondataUserAns[k].positionRd,
                                            'key':listQues[j].key,
                                            'result': true
                                        });
                                    } else if (listQues[j].key == 2 && listQues[j].option2 == JsondataUserAns[k].UserOp) {
                                        listResult.push({
                                            'ofArticle': JsondataUserAns[k].ofArticle,
                                            'ofQues': listQues[j].id,
                                            'QuesContent': listQues[j].question,
                                            'UserOp':JsondataUserAns[k].UserOp,
                                            'positionRd':JsondataUserAns[k].positionRd,
                                            'key':listQues[j].key,
                                            'result': true
                                        });
                                    } else if (listQues[j].key == 3 && listQues[j].option3 == JsondataUserAns[k].UserOp) {
                                        listResult.push({
                                            'ofArticle': JsondataUserAns[k].ofArticle,
                                            'ofQues': listQues[j].id,
                                            'QuesContent': listQues[j].question,
                                            'UserOp':JsondataUserAns[k].UserOp,
                                            'positionRd':JsondataUserAns[k].positionRd,
                                            'key':listQues[j].key,
                                            'result': true
                                        });
                                    } else if (listQues[j].key == 4 && listQues[j].option4 == JsondataUserAns[k].UserOp) {
                                        listResult.push({
                                            'ofArticle': JsondataUserAns[k].ofArticle,
                                            'ofQues': listQues[j].id,
                                            'QuesContent': listQues[j].question,
                                            'UserOp':JsondataUserAns[k].UserOp,
                                            'positionRd':JsondataUserAns[k].positionRd,
                                            'key':listQues[j].key,
                                            'result': true
                                        });
                                    } else {
                                        listResult.push({
                                            'ofArticle': JsondataUserAns[k].ofArticle,
                                            'ofQues': listQues[j].id,
                                            'QuesContent': listQues[j].question,
                                            'UserOp':JsondataUserAns[k].UserOp,
                                            'positionRd':JsondataUserAns[k].positionRd,
                                            'key':listQues[j].key,
                                            'result': false
                                        });
                                    }
                                    //remove question not empty
                                    listQues.splice(j, 1);
                                }
                            }
                        }
                        data.push(listQues);
                        data.push(listResult);
                        res.send(data);
                    }
                });

            });
        }
    }
};

