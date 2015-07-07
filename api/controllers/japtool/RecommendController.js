module.exports = {
    getStep3: function (req, res) {
        var lv = req.param('lv');
        Survey.find({level: lv}).limit(constants.maxSurveyQuestion).exec(function (err, surveies) {
            if (err) {
            }
            res.render('japtool/Recommend/step3', {
                surveies: surveies
            });
        })
    },
    getLibraryForFirtLogin: function (req, res) {
        var lv = req.param('lv');
        var cLT = req.param('cLT');
        var listSv = req.param('sV');
        if (listSv == null) {
            BookMaster.find({level: lv}).limit(constants.maxLibraRec).exec(function (err, lbrs) {
                if (err) {
                }
                User.update({id: req.session.User.id}, {
                    currentLevel: lv,
                    currentLearningTime: cLT
                }).exec(function (err, ok) {
                    if (err) {
                    }
                    res.render('japtool/Recommend/LibraRecommend', {
                        lbrs: lbrs
                    });
                })
            })
        }
        else {
            var listid = req.param("id").split(",");
            BookMaster.find({level: lv}).limit(constants.maxLibraRec).exec(function (err, lbrs) {
                if (err) {
                }
                User.update({id: req.session.User.id}, {
                    currentLevel: lv,
                    currentLearningTime: cLT
                }).exec(function (err, ok) {
                    if (err) {
                    }
                    var posArray = listSv.split(",");
                    for (var i = 0; i < listid.length; i++) {
                        var arrTemp = new Array();
                        for (var j = 0; j < 4; j++) {
                            if (posArray[i] == j) {
                                arrTemp[j] = true;
                            }
                            else {
                                arrTemp[j] = false;
                            }
                        }
                        SurveyUser.create({
                            surveyID: listid[i],
                            correct1: arrTemp[0],
                            correct2: arrTemp[1],
                            correct3: arrTemp[2],
                            correct4: arrTemp[3]
                        }).exec(function (err, sur) {
                            if (err) {
                            }
                        })
                    }
                    return res.render('japtool/Recommend/LibraRecommend', {
                        lbrs: lbrs
                    });
                })
            })
        }
    },
    getLibraryLogin: function (req, res) {
        var lv= req.session.User.currentLevel;
        BookMaster.find({level: lv}).limit(constants.maxLibraRec).exec(function (err, lbrs) {
            if (err) {
            }
            res.render('japtool/Recommend/LibraRecommend', {
                lbrs: lbrs
            });
        })


        /*var cLT = req.param('cLT');
        var listSv = req.param('sV');
        if (listSv == null) {
            BookMaster.find({level: lv}).limit(constants.maxLibraRec).exec(function (err, lbrs) {
                if (err) {
                }
                User.update({id: req.session.User.id}, {
                    currentLevel: lv,
                    currentLearningTime: cLT
                }).exec(function (err, ok) {
                    if (err) {
                    }
                    res.render('japtool/Recommend/LibraRecommend', {
                        lbrs: lbrs
                    });
                })
            })
        }*/
    }
}
