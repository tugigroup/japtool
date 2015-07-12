module.exports = {
    getStep3: function (req, res) {
        var lv = req.param('lv');
        Survey.find({level: lv}).limit(Constants.maxSurveyQuestion).exec(function (err, surveies) {
            if (err) {
            }
            res.render('japtool/recommend/step3', {
                surveies: surveies
            });
        })
    },
    getLibraryForFirtLogin: function (req, res) {
        var lv = req.param('lv');
        var cLT = req.param('cLT');
        var listSv = req.param('sV');
        if (listSv == null) {
            BookMaster.find({level: lv}).limit(Constants.maxLibraRs).exec(function (err, lbrs) {
                if (err) {
                }
                User.update({id: req.session.User.id}, {
                    currentLevel: lv,
                    currentLearningTime: cLT
                }).exec(function (err, ok) {
                    if (err) {
                    }
                    res.view('japtool/recommend/LibraRecommend', {
                        lbrs: lbrs
                    });
                })
            })
        }
        else {
            var listid = req.param("id").split(",");
            BookMaster.find({level: lv}).limit(Constants.maxLibraRec).exec(function (err, lbrs) {
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
                            UserID:req.session.User.id,
                            correct1: arrTemp[0],
                            correct2: arrTemp[1],
                            correct3: arrTemp[2],
                            correct4: arrTemp[3]
                        }).exec(function (err, sur) {
                            if (err) {
                            }
                        })
                    }
                    return res.view('japtool/recommend/LibraRecommend', {
                        lbrs: lbrs
                    });
                })
            })
        }
    },
    getLibraryLogin: function (req, res) {
        var lv= req.session.User.currentLevel;
        BookMaster.find({level: lv}).limit(Constants.maxLibraRec).exec(function (err, lbrs) {
            if (err) {
            }
            res.view('japtool/recommend/LibraRecommend', {
                lbrs: lbrs
            });
        })


        /*var cLT = req.param('cLT');
        var listSv = req.param('sV');
        if (listSv == null) {
            BookMaster.find({level: lv}).limit(Constants.maxLibraRec).exec(function (err, lbrs) {
                if (err) {
                }
                User.update({id: req.session.User.id}, {
                    currentLevel: lv,
                    currentLearningTime: cLT
                }).exec(function (err, ok) {
                    if (err) {
                    }
                    res.render('japtool/recommend/LibraRecommend', {
                        lbrs: lbrs
                    });
                })
            })
        }*/
    },
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
        }
    }
}
