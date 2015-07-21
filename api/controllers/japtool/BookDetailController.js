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
        /*console.log("learningId: " + learningId);*/
        var startDate = req.param('startDate');
        var finishDate = req.param('finishDate');
        finishDate = new Date(finishDate);
        startDate = new Date(startDate);
        /*sails.log("Start Date: " + startDate);
        sails.log("Finish Date: " + finishDate);*/
        var currentDate = Date.now();
        //Only recommend when in learning time
        if(currentDate < startDate||currentDate > finishDate)
        {
            return res.send([]);
        }
        BookDetail.find({bookMaster: bookId}).exec(function (err, bookDetails) {
            if (err) {
                sails.log("Err when read book detail data:");
                return res.serverError(err);
            }
            SelfLearning.findOne({user: req.session.User.id,id:learningId})
                .populate('bookMaster')
                .populate('userLearnHistories').exec(function (err, selfLearning) {
                    if (err) {
                        sails.log("Err when read data from server:");
                        return res.serverError(err);
                    }
                    //sails.log("Book Use History All.");
                    //sails.log(selfLearnings);
                    if (selfLearning == null || selfLearning == undefined) {
                        return res.send([]);
                    }
                    var totalDay = Math.round((finishDate - startDate) / 86400000 + 1);
                    //console.log("Day = " + totalDay);
                    //number Lesson / Day
                    var lesson = Math.round(bookDetails / totalDay);
                    var currentTotalDay = Math.round((currentDate - startDate) / 86400000 + 1);
                    //console.log("Current Day = " + currentTotalDay);
                    //Only recommend when in learning time
                    if(currentDate < startDate||currentDate > finishDate)
                    {
                        return res.send([]);
                    }
                    res.send(bookDetails);
                });
        });
    },
};

