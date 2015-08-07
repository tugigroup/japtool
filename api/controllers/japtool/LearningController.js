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
                    res.send("/japtool/Learning/practice/?id=" + learning.bookMaster.id + "&learnID=" + learning.id);
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
                    res.send("/japtool/Learning/practice/?id=" + learning.bookMaster.id + "&learnID=" + learning.id);
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
                            var create = '<h3> __("book already") <a href = "/japtool/Learning/practice/?id=<%= book.id %>" > < /a></h3 > ';
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
                                    res.send('japtool/learning/practice/?id=' + bookMaster);
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
        BookMaster.find()
            .sort('sort asc')
            .exec(function (err, books) {
                if (err) {

                }
                else {
                    res.render('japtool/learning/choosebook', {
                        books: books
                    });
                }
            })
    },
    getItemsBooks: function (req, res) {
        var type = req.param('chooseBookCat');

        BookMaster.find({type: type}).exec(function (err, books) {
            if (err) {
                console.log(err)
            } else {
                res.render('japtool/learning/BookItem', {books: books});
            }
        })
    },
    index: function (req, res) {
        var arrTag = [];
        SelfLearning.find().populate('bookMaster', {sort: 'startDate'}).exec(function (err, selfLearnings) {
            if (err) {
                sails.log("Err")
            }
            else {
                selfLearnings.forEach(function (item, index) {
                    var startDate = item.startDate;
                    var finishDate = item.finishDate;
                    finishDate.setHours(23, 59, 59);
                    var now = new Date();
                    if (startDate < now < finishDate) {
                        item.status = req.__("Started");
                    }
                    if (now < startDate) {
                        item.status = req.__("Prepare");
                    }
                    if (now > finishDate) {
                        item.status = req.__("Out of date");
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

    practice: function (req, res) {
        var id = req.param('id');
        var learnID = req.param('learnID');
        var array = require("array-extended");
        BookMaster.findOne({id: id}).populate('bookDetails', {sort: 'sort ASC'}).exec(function createCB(err, data) {
            if (err) {
                sails.log(err)
            } else {
                var bookDetails = data.bookDetails;
                var lessons = [];
                bookDetails.forEach(function (item) {
                    lessons.push(item.lesson);
                });
                var uniqueLessons = array(lessons).unique().value();
                //Search a lesson last of User and show to screen
                UserLearnHistory.findOne({
                    selfLearning: learnID,
                    sort: 'createdAt DESC'
                }).exec(function learnHistory(err, lessonItem) {
                    if (err) {
                        sails.log(err)
                    }
                    if (lessonItem || lessonItem != undefined) {
                        var bookDetailH = lessonItem.bookDetail;
                        BookDetail.findOne({id: bookDetailH}).exec(function (err, lessonItemType) {
                            if (err) {
                                sails.log(err)
                            }
                            var dataExtractCondition = lessonItemType.dataExtractCondition;
                            var useModule = lessonItemType.useModule;
                            res.view('japtool/learning/show-book-detail', {
                                uniqueLessons: uniqueLessons,
                                learnID: learnID,
                                bookDetails: bookDetails,
                                nameBook: data.name,
                                type: data.type,
                                condition: dataExtractCondition,
                                useModule: useModule,
                                lessonItem: lessonItem
                            });
                        })
                    } else {
                        res.view('japtool/learning/show-book-detail', {
                            uniqueLessons: uniqueLessons,
                            learnID: learnID,
                            bookDetails: bookDetails,
                            nameBook: data.name,
                            description: data.description,
                            type: data.type,
                            level: data.level,
                            sort: data.sort,
                            lessonNum: data.lessonNum,
                            hoursForLearn: data.hoursForLearn,
                            usedNum: data.usedNum,
                            lessonItem: lessonItem
                        });
                    }
                });
            }
        })
    },

    saveHistory: function (req, res) {
        var pars = req.allParams();
        UserLearnHistory.findOne({
            user: pars.user,
            selfLearning: pars.selfLearning,
            lesson: pars.lesson
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
                if (!pars.status) {
                    sails.log("khong co status");
                }
                else {
                    if (data.status == "passed") {
                    }
                    else {
                        UserLearnHistory.update({id: data.id}, {
                            status: pars.status, mark: pars.mark, finishDate: pars.finishDate
                        }).exec(function (err, updated) {
                            if (err) {
                                sails.log(err)
                            } else {
                                res.send('Record has update');
                            }
                        })
                    }
                    sails.log(pars.status);
                }


            }
        });
    }
    /*getMissLesson: function (req, res) {
     var bookId = req.param('bookId');
     var learningId = req.param('learningId');
     var startDate = req.param('startDate');
     var finishDate = req.param('finishDate');
     finishDate = new Date(finishDate);
     startDate = new Date(startDate);
     finishDate.setHours(23, 59, 59);
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
     var totalDay = Math.ceil((finishDate - startDate) / 86400000);
     sails.log('Total day: ' + totalDay);
     var passedDay = totalDay - (Math.ceil((finishDate - currentDate) / 86400000));

     var lessonPerDay = Math.ceil(bookDetails.length / totalDay);
     var totalMissLesson = Math.ceil(passedDay * lessonPerDay);
     var lessonLearning = selfLearning.userLearnHistories.length;
     sails.log('lessonLearning :' + lessonLearning);
     var bookMissLessons = new Array();
     for (var j = 0; j < bookDetails.length; j++) {
     var pus=1;
     var check = 0;
     for (var k = 0; k < selfLearning.userLearnHistories.length; k++) {
     check++;
     if (bookDetails[j].id == selfLearning.userLearnHistories[k].bookDetail) {
     pus = 2;
     }
     if ((check) == selfLearning.userLearnHistories.length) {
     sails.log("Da check" + j);
     if (pus == 1) {
     bookMissLessons.push(bookDetails[j]);
     sails.log("Push");
     if (bookMissLessons.length == totalMissLesson) {
     sails.log("sended")
     res.send(bookMissLessons);
     return;
     }
     else {

     }
     }


     }
     }

     }
     /!*for (var j = 0; j < selfLearning.userLearnHistories.length; j++) {
     sails.log(i+''+selfLearning.userLearnHistories[i].bookDetail);
     if (bookDetails[i].id == selfLearning.userLearnHistories[j].bookDetail) {
     bookMissLessons.push(bookDetails[i]);
     break;
     }
     if (i == totalMissLesson - 1 && j == selfLearning.userLearnHistories.length - 1) {
     res.send(bookMissLessons);
     }
     }*!/


     });
     });
     }*/
};
