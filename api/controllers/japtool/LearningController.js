/**
 * Created by NamMH on 6/29/2015.
 */
module.exports = {
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
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
        var create = null;
        SelfLearning.findOne({
            user: userId,
            bookMaster: bookid
        }).populate('bookMaster', {sort: 'startDate'}).exec(function (err, learning) {
            if (err) {

            }
            else if (learning == undefined) {
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
                var now = new Date();
                var finish = learning.finishDate;
                finish.setHours(23, 59, 59);
                if (finish < now) {
                    var msg = 2;
                    res.render('japtool/learning/mesage', {
                        learning: learning,
                        msg: msg
                    });
                }
                else {
                    res.send("/japtool/BookMaster/practice/?id=" + learning.bookMaster.id + "&learnID=" + learning.id);
                }
            }

        })
    },
    checkLearning: function (req, res) {
        var learnId = req.param('learnID');
        SelfLearning.findOne({
            id: learnId
        }).populate('bookMaster', {sort: 'startDate'}).exec(function (err, learning) {
            if (err) {

            }
            else {
                var now = new Date();
                var finish = learning.finishDate;
                finish.setHours(23, 59, 59);
                if (finish < now) {
                    var msg = 2;
                    res.render('japtool/learning/mesage', {
                        learning: learning,
                        msg: msg
                    });
                }
                else {
                    res.send("/japtool/BookMaster/practice/?id=" + learning.bookMaster.id + "&learnID=" + learning.id);
                }
            }
        })
    },
    edit: function (req, res) {
        var id = req.param("id");
        var format = require('date-format');
        var stringFinishDate = format.asString('dd-MM-yyyy', new Date(req.param('finishDate')));
        var finishDate = req.param("finishDate");
        var notes = req.param("notes");
        SelfLearning.update({id: id}, {
            notes: notes,
            finishDate: finishDate,
            stringFinishDate: stringFinishDate
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
                var startdate = learning.stringStartDate.split("-");
                learning.stringStartDate = "" + startdate[2] + "-" + startdate[1] + "-" + startdate[0] + "";
                var finishdate = learning.stringFinishDate.split("-");
                learning.stringFinishDate = "" + finishdate[2] + "-" + finishdate[1] + "-" + finishdate[0] + "";
                res.render('japtool/learning/edit', {
                    learning: learning
                });
            }

        })

    },
    add: function (req, res) {

        try {
            var lbr = req.param('lbr');
            var userId = req.session.User.id;
            var notes = req.param('notes');
            var bookMaster = req.param('bookMaster');
            var startDatepr = req.param('startDate');
            var finishDatepr = req.param('finishDate');
            var format = require('date-format');
            var stringStartDate = format.asString('dd-MM-yyyy', new Date(req.param('startDate')));
            var stringFinishDate = format.asString('dd-MM-yyyy', new Date(req.param('finishDate')));
            if (!lbr) {

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
                            stringStartDate: stringStartDate,
                            stringFinishDate: stringFinishDate,
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
                                    res.send('japtool/learning/');
                                }
                            })

                        });
                    }
                    else {
                        var startDate = learning.startDate;
                        var finishDate = learning.finishDate;
                        var now = new Date();

                        if (finishDate > now) {
                            var create = '<h3>Ban da dang hoc mot learning ve quyen sach nay, ban can xoa learning do de tao 1 learningmoivenohoactieptuchoctai <a href = "/japtool/BookMaster/practice/?id=<%= book.id %>" > day < /a></h3 > ';
                            res.render('japtool/learning/create', {
                                create: create,
                                book: learning.bookMaster,
                                learning: learning
                            });
                        }

                        else {
                            SelfLearning.create({
                                notes: notes,
                                startDate: startDatepr,
                                finishDate: finishDatepr,
                                stringStartDate: stringStartDate,
                                stringFinishDate: stringFinishDate,
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
                                        res.send('japtool/learning/');
                                    }
                                })

                            });
                        }
                    }
                })
            }
            else {
                SelfLearning.findOne({
                    user: userId,
                    bookMaster: bookMaster
                }).populate('bookMaster', {sort: 'startDate'}).exec(function (err, learning) {
                    if (err) {

                    }
                    else {
                        SelfLearning.create({
                            notes: notes,
                            startDate: startDatepr,
                            finishDate: finishDatepr,
                            stringStartDate: stringStartDate,
                            stringFinishDate: stringFinishDate,
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
                                    res.send('japtool/BookMaster/practice/?id=' + bookMaster);
                                }
                            })
                        });
                    }
                })
            }

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
        SelfLearning.find().populate('bookMaster', {sort: 'startDate'}).exec(function (err, selfLearnings) {
            if (err) {
                sails.log("Loi cmnr")
            }
            else {
                selfLearnings.forEach(function (item, index) {
                    var startDate = item.startDate;
                    var finishDate = item.finishDate;
                    finishDate.setHours(23, 59, 59);
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
                uniqueType: uniqueType
            })
        })
    },
    deleteLearning: function (req, res) {
        var id = req.param('id');
        SelfLearning.findOne({id: id}).exec(function (err, selfLearn) {
            if (err) {

            }
            else {
                var now = new Date();
                if (selfLearn.finishDate < now) {
                    var msg = '3';
                    res.render('japtool/learning/mesage', {
                        msg: msg
                    });
                }
                else {
                    SelfLearning.destroy({id: id}).exec(function (err, ok) {
                        if (err) {

                        }
                        else {
                            res.send('japtool/learning/');
                        }
                    })
                }
            }
        })

    },
};
