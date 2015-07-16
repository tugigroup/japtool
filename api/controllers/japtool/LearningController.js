/**
 * Created by NamMH on 6/29/2015.
 */
module.exports = {
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
        }
    },
    home: function (req, res) {
        try {
            SelfLearning.find({user: req.session.User.id})
                .populate('bookMaster')
                .populate('userLearnHistories').exec(function (err, selfLearnings) {
                    if (err) {
                        sails.log("Err when read data from server:");
                        return res.serverError(err);
                    }
                    sails.log("Book Use History All.");
                    sails.log(selfLearnings);
                    if (selfLearnings == null || selfLearnings == undefined) {
                        return res.json({err: "Error"});
                    }
                    /*selfLearnings.forEach(function(bookUse){
                     sails.log(bookUse.bookMaster);
                     });*/
                    //sails.log(selfLearnings);
                    res.view('japtool/home/home', {selfLearnings: selfLearnings});
                });
        }
        catch (ex) {
            sails.log(ex);
        }
    },
    /**
     * GET: japtool/learning/create
     * @param req
     * @param res
     */
    create: function (req, res) {
        var bookid = req.param('bookid');
        var userId = req.session.User.id;
        var create = 'ok';
        SelfLearning.findOne({
            user: userId,
            bookMaster: bookid
        }).populate('bookMaster', {sort: 'startDate'}).exec(function (err, learning) {
            if (err) {

            }
            if (learning == undefined) {
                BookMaster.findOne({id: bookid}).exec(function (err, books) {
                    if (err) {

                    }
                    else {
                        res.render('japtool/learning/create', {
                            create: create,
                            book: books
                        });
                    }
                })
            }
            else {
                res.send("/japtool/BookMaster/practice/?id=" + bookid + "&learnID=" + learning.id);
            }

        })

    },
    edit: function (req, res) {
        var id = req.param("id");
        var finishDate = req.param("finishDate");
        var notes = req.param("notes");
        SelfLearning.update({id: id}, {
            notes: notes,
            finishDate: finishDate
        }).exec(function (err, ok) {
            if (err) {

            }
            else {
                res.redirect('japtool/learning/');
            }
        })
    },
    loadEditForm: function (req, res) {
        var id = req.param("id");
        SelfLearning.findOne({id: id}).populate('bookMaster', {sort: 'startDate'}).exec(function (err, learning) {
            if (err) {

            }
            else {
                var startdate = learning.startDate;
                var dds = startdate.getDate();
                if (dds <= 9) {
                    dds = "0" + dds;
                }
                var mms = startdate.getMonth() + 1;
                if (mms <= 9) {
                    mms = "0" + mms;
                }
                var yyyys = startdate.getFullYear();
                var startdateString = "" + yyyys + "-" + mms + "-" + dds + "";
                var finishdate = learning.finishDate;
                var ddf = finishdate.getDate();
                if (ddf <= 9) {
                    ddf = "0" + ddf;
                }
                var mmf = finishdate.getMonth() + 1;
                if (mmf <= 9) {
                    mmf = "0" + mmf;
                }
                var yyyyf = finishdate.getFullYear();
                var finishdateString = "" + yyyyf + "-" + mmf + "-" + ddf + "";
                res.render('japtool/learning/edit', {
                    startDateString: startdateString,
                    finishdate: finishdateString,
                    learning: learning
                });
            }

        })

    },
    add: function (req, res) {

        try {
            var userId = req.session.User.id;
            var notes = req.param('notes');
            var bookMaster = req.param('bookMaster');
            var startDatepr = req.param('startDate');
            var finishDatepr = req.param('finishDate');
            SelfLearning.findOne({
                user: userId,
                bookMaster: bookMaster
            }).populate('bookMaster', {sort: 'startDate'}).exec(function (err, learning) {
                if (err) {

                }
                if (!learning) {
                    SelfLearning.create({
                        notes: notes,
                        startDate: startDatepr,
                        finishDate: finishDatepr,
                        bookMaster: bookMaster,
                        user: userId
                    }).exec(function (err, selfLearning) {
                        if (err) {
                            return res.json({err: err});
                        }
                        if (!selfLearning) {
                            return res.json({err: "Error"});
                        }
                        BookUseHistory.create({
                            userId: userId,
                            bookMaster: bookMaster,
                            startDate: startDatepr,
                            finishDate: finishDatepr,
                            selfLearning: selfLearning
                        }).exec(function (err, bookusehistory) {
                            if (err) {

                            }
                            else {
                                res.redirect('japtool/learning/');
                            }
                        })

                    });
                }
                else {
                    var startDate = learning.startDate;
                    var finishDate = learning.finishDate;
                    var now = new Date();

                    if (finishDate > now) {
                        var create = 'dont';
                        res.view('japtool/learning/create', {
                            create: create,
                            book: learning.bookMaster
                        });
                    }
                    else {
                        SelfLearning.create({
                            notes: notes,
                            startDate: startDatepr,
                            finishDate: finishDatepr,
                            bookMaster: bookMaster,
                            user: userId
                        }).exec(function (err, selfLearning) {
                            if (err) {
                                return res.json({err: err});
                            }
                            if (!selfLearning) {
                                return res.json({err: "Error"});
                            }
                            BookUseHistory.create({
                                userId: userId,
                                bookMaster: bookMaster,
                                startDate: startDatepr,
                                finishDate: finishDatepr,
                                selfLearning: selfLearning
                            }).exec(function (err, bookusehistory) {
                                if (err) {

                                }
                                else {
                                    res.redirect('japtool/learning/');
                                }
                            })

                        });
                    }
                }
            })

        }
        catch (ex) {
            sails.log(ex);
        }
    },
    /**
     * GET: /learning/search
     * @param req
     * @param res
     */

    getBooks: function (req, res) {
        BookMaster.find().exec(function (err, books) {
            if (err) {

            }
            else {
                res.render('japtool/learning/choosebook', {
                    books: books
                });
            }
        })
    },

    index: function (req, res) {
        var arrTag = [];
        var arrStart = new Array();
        var arrFinish = new Array();
        SelfLearning.find().populate('bookMaster', {sort: 'startDate'}).exec(function (err, selfLearnings) {
            if (err) {
                sails.log("Loi cmnr")
            }
            else {
                selfLearnings.forEach(function (item, index) {
                    var startDate = item.startDate;
                    var dds = startDate.getDate();
                    if (dds <= 9) {
                        dds = "0" + dds;
                    }
                    var mms = startDate.getMonth() + 1;
                    if (mms <= 9) {
                        mms = "0" + mms;
                    }
                    var yyyys = startDate.getFullYear();
                    var startdateString = "" + dds + "-" + mms + "-" + yyyys + "";
                    arrStart.push(startdateString);
                    var finishDate = item.finishDate;
                    var ddf = finishDate.getDate();
                    if (ddf <= 9) {
                        ddf = "0" + ddf;
                    }
                    var mmf = finishDate.getMonth() + 1;
                    if (mmf <= 9) {
                        mmf = "0" + mmf;
                    }
                    var yyyyf = finishDate.getFullYear();
                    var finishdateString = "" + ddf + "-" + mmf + "-" + yyyyf + "";
                    arrFinish.push(finishdateString);
                    var now = new Date();
                    if (startDate < now < finishDate) {
                        item.status = "Started!";
                    }
                    if (now < startDate) {
                        item.status = "Prepar!";
                    }
                    if (now > finishDate) {
                        item.status = "Out of date!";
                    }
                    arrTag.push(item.bookMaster.type);
                })
            }

            var array = require("array-extended");
            var uniqueType = array(arrTag).unique().value();
            res.view({
                learnList: selfLearnings,
                uniqueType: uniqueType,
                arrFinish: arrFinish,
                arrStart: arrStart
            })
        })
    },
    deleteLearning: function (req, res) {
        var id = req.param('id');
        SelfLearning.destroy({id: id}).exec(function (err, ok) {
            if (err) {

            }
            else {
                res.redirect('japtool/learning/');
            }
        })
    },
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
        }
    }
};
