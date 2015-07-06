module.exports = {
//This loads index.ejs

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
    getLibrary: function (req, res) {
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
                            if(posArray[i]==j){
                                arrTemp[j] = true;
                            }
                            else
                            {
                                arrTemp[j] = false;
                            }
                            sails.log(arrTemp[j])
                        }
                        SurveyUser.create({
                            surveyID:listid[i],
                            correct1:arrTemp[0],
                            correct2:arrTemp[1],
                            correct3:arrTemp[2],
                            correct4:arrTemp[3]}).exec(function (err, sur) {
                            if (err) {

                            }
                            res.render('japtool/Recommend/LibraRecommend', {
                                lbrs: lbrs
                            });

                        })

                    }


                })

            })

        }


    }
}

/**
 * Created by TuyenTV1 on 6/22/2015.
 */