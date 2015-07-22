/**
 * BookDetailController
 *
 * @description :: Server-side logic for managing bookdetails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        var params = req.allParams();
        BookDetail.create(params).exec(function createCB(err, data) {
            if (err) {
                sails.log(err)
            } else {
                res.send('BookDetail has been create');
            }
        })
    },
    getBookDetail: function (req, res) {
        BookMaster.find().exec(function createCB(err, data) {
            res.view('admin/article/book-detail', {data: data, layout: 'layout/layout-japtool'});
        })
    },

    saveHistory: function (req, res) {
        var pars = req.allParams();
        UserLearnHistory.findOne({
            user: pars.user,
            bookDetail: pars.bookDetail,
            selfLearning: pars.selfLearning
        }).exec(function (err, data) {
            if (data == undefined) {
                UserLearnHistory.create(pars).exec(function createCB(err, history) {
                    if (err) {
                        sails.log(err)
                    } else {
                        res.send('Create Learning history successful')
                    }
                })
            } else {
                var currentDate = new Date();
                UserLearnHistory.update({id: data.id}, {
                    startDate: currentDate,
                    finishDate: currentDate
                }).exec(function (err, updated) {
                    if (err) {
                        sails.log(err)
                    } else {
                        res.send('Record has update');
                    }
                })
            }
        });
    },
    getMissLesson: function (req, res) {
        var bookId = req.param('bookId');
        var learningId = req.param('learningId');
        var startDate = req.param('startDate');
        var finishDate = req.param('finishDate');
        finishDate = new Date(finishDate);
        startDate = new Date(startDate);
        var currentDate = Date.now();
        //Only recommend when in learning time
        if (currentDate < startDate || currentDate > finishDate) {
            return res.send([]);
        }
        SelfLearning.findOne({user: req.session.User.id, id: learningId})
            .populate('bookMaster')
            .populate('userLearnHistories').exec(function (err, selfLearning) {
                if (err) {
                    sails.log("Err when read data from server:");
                    return res.serverError(err);
                }
                BookDetail.find({bookMaster: bookId}).exec(function (err, bookDetails) {
                    if (err) {
                        sails.log("Err when read book detail data:");
                        return res.serverError(err);
                    }
                    if (selfLearning == null || selfLearning == undefined) {
                        return res.send([]);
                    }
                    //Only recommend when in learning time
                    if (currentDate < startDate || currentDate > finishDate) {
                        return res.send([]);
                    }
                    //Total learning Day
                    var totalDay = Math.ceil((finishDate - startDate) / 86400000) + 1;
                    // Total Lesson Day
                    var lessonDay = Math.ceil(bookDetails.length / totalDay);
                    //Total Current Day
                    var currentTotalDay = Math.ceil((currentDate - startDate) / 86400000) + 1;
                    //current total Lesson Day
                    var currentTotalLessonDay = Math.ceil(currentTotalDay * lessonDay);
                    //current total lesson learning
                    var lessonLearning = selfLearning.userLearnHistories.length;

                    //miss total lesson
                    if (lessonDay > bookDetails.length || lessonLearning >= currentTotalLessonDay) {
                        /*sails.log("current total lesson learning: "
                        + lessonLearning + "-current total Lesson Day: " + currentTotalLessonDay);*/
                        return res.send([]);
                    }
                    else {
                        var bookMissLessons = new Array();
                        for (var i = 0; i < currentTotalLessonDay; i++) {
                            for (var j = 0; j < selfLearning.userLearnHistories.length; j++) {
                                if (bookDetails[i].id == selfLearning.userLearnHistories[j].bookDetail) {
                                    bookMissLessons.push(bookDetails[i]);
                                    break;
                                }
                                if (i == currentTotalLessonDay - 1 && j == selfLearning.userLearnHistories.length - 1)
                                {
                                    res.send(bookMissLessons);
                                }
                            }
                        }
                    }
                });
            });
    }
};

