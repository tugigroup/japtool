/**
 * Created by TuyenTV1 on 6/22/2015.
 */
module.exports = {
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
        }
    },
//This loads index.ejs
    index: function (req, res) {
        userId = req.session.User.id;
        SelfLearning.find({
            where: {user: userId},
            limit: 3,
            sort: 'createdAt DESC'
        }).populate('bookMaster').exec(function (err, listLessons) {
            if (err) {
                if (err) return res.serverError(err);
            } else {
                res.view('japtool/home/home', {listLessons: listLessons});

            }
        })

    },
    lessonHome: function (req, res) {
        var bookMasterId = req.param('bookMasterId');
        var selfLesson = req.param('selfLesson');
        var moreSelfLesson = req.param('moreSelfLesson');
        BookDetail.find({
            bookMaster: bookMasterId,
            sort: 'sort ASC',
            subLesson: {'!': 'Từ vựng'}
        }).exec(function (err, listItems) {
            if (err) {
                console.log(err);
            } else {
                if(!moreSelfLesson || moreSelfLesson == undefined) {
                    UserLearnHistory.find({selfLearning: selfLesson}).exec(function (err, selfLesson) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('japtool/home/lessonHome', {
                                listItems: listItems,
                                selfLesson: selfLesson
                            });

                        }
                    })
                }else{
                    UserLearnHistory.find({selfLearning: moreSelfLesson}).exec(function (err, selfLesson) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('japtool/home/limitLessonHome', {
                                listItems: listItems,
                                moreSelfLesson: selfLesson
                            });

                        }
                    })
                }
            }




        })
    },
    loadMoreIndex: function (req, res) {
        userId = req.session.User.id;
        var start = parseInt(req.param('start'));
        SelfLearning.find({
            where: {user: userId},
            limit: 1,
            skip: start,
            sort: 'createdAt DESC'
        }).populate('bookMaster').exec(function (err, listLessons) {
            if (err) {
                if (err) return res.serverError(err);
            } else {
                res.render('japtool/home/limitLesson', {
                    loadMorelistLessons: listLessons
                });
            }
        })

    }
}
