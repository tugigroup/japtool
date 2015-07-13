module.exports = {
    getStep3: function (req, res) {

        Survey.find().limit(Constants.maxSurveyQuestion).exec(function (err, surveies) {
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
            BookMaster.find({level: lv}).populate('bookDetails',{sort:'sort ASC'}).limit(Constants.maxLibraRs).exec(function createCB(err, data) {
                User.update({id: req.session.User.id}, {
                    currentLevel: lv,
                    currentLearningTime: cLT
                }).exec(function (err, ok) {
                    if (err) {
                    }
                    var arrTag = [];
                    var arrAllLesson = [];

                    data.forEach(function (book) {
                        var arrLesson = [];
                        if (book.bookDetails.length != 0) {
                            book.bookDetails.forEach(function (item, index) {
                                arrLesson.push(item.lesson);
                                if (index == (book.bookDetails.length - 1)) {
                                    var array = require("array-extended");
                                    var uniqueArrLesson = array(arrLesson).unique().value();
                                    var objLesson = {
                                        arrLesson: uniqueArrLesson,
                                        idLesson: book.id
                                    };
                                    arrAllLesson.push(objLesson);
                                }
                            })
                        }
                    });

                    data.forEach(function (item, index) {
                        arrTag.push(item.type);
                        if (index == (data.length - 1)) {
                            var array = require("array-extended");
                            var uniqueType = array(arrTag).unique().value();
                            res.view('japtool/Recommend/LibraRecommend', {
                                data: data,
                                uniqueType: uniqueType,
                                arrAllLesson: arrAllLesson,
                                layout: 'layout/layout-japtool'
                            })
                        }
                    })
                })

            })
        }
        else {
            var listid = req.param("id").split(",");
            BookMaster.find({level: lv}).populate('bookDetails',{sort:'sort ASC'}).limit(Constants.maxLibraRs).exec(function createCB(err, data) {
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
                            UserID: req.session.User.id,
                            correct1: arrTemp[0],
                            correct2: arrTemp[1],
                            correct3: arrTemp[2],
                            correct4: arrTemp[3]
                        }).exec(function (err, sur) {
                            if (err) {
                            }
                        })
                    }
                    var arrTag = [];
                    var arrAllLesson = [];

                    data.forEach(function (book) {
                        var arrLesson = [];
                        if (book.bookDetails.length != 0) {
                            book.bookDetails.forEach(function (item, index) {
                                arrLesson.push(item.lesson);
                                if (index == (book.bookDetails.length - 1)) {
                                    var array = require("array-extended");
                                    var uniqueArrLesson = array(arrLesson).unique().value();
                                    var objLesson = {
                                        arrLesson: uniqueArrLesson,
                                        idLesson: book.id
                                    };
                                    arrAllLesson.push(objLesson);
                                }
                            })
                        }
                    });

                    data.forEach(function (item, index) {
                        arrTag.push(item.type);
                        if (index == (data.length - 1)) {
                            var array = require("array-extended");
                            var uniqueType = array(arrTag).unique().value();
                            res.view('japtool/Recommend/LibraRecommend', {
                                data: data,
                                uniqueType: uniqueType,
                                arrAllLesson: arrAllLesson,
                                layout: 'layout/layout-japtool'
                            })
                        }
                    })
                })

            })
        }
    },

    getLibraryLogin: function (req, res) {
        var lv = req.session.User.currentLevel;
        BookMaster.find({level: lv}).populate('bookDetails',{sort:'sort ASC'}).limit(Constants.maxLibraRs).exec(function createCB(err, data) {
            var arrTag = [];
            var arrAllLesson = [];
            data.forEach(function (book) {
                var arrLesson = [];
                if (book.bookDetails.length != 0) {
                    book.bookDetails.forEach(function (item, index) {
                        arrLesson.push(item.lesson);
                        if (index == (book.bookDetails.length - 1)) {
                            var array = require("array-extended");
                            var uniqueArrLesson = array(arrLesson).unique().value();
                            var objLesson = {
                                arrLesson: uniqueArrLesson,
                                idLesson: book.id
                            };
                            arrAllLesson.push(objLesson);
                        }
                    })
                }
            });

            data.forEach(function (item, index) {
                arrTag.push(item.type);
                if (index == (data.length - 1)) {
                    var array = require("array-extended");
                    var uniqueType = array(arrTag).unique().value();
                    res.view('japtool/Recommend/LibraRecommend', {
                        data: data,
                        uniqueType: uniqueType,
                        arrAllLesson: arrAllLesson,
                        layout: 'layout/layout-japtool'
                    })
                }
            })

        })
    },
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
        }
    }
}
