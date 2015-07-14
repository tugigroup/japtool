/**
 * BookMasterController
 *
 * @description :: Server-side logic for managing bookmasters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    createBook: function (req, res) {
        res.view('admin/article/book-master', {layout: 'layout/layout-japtool'});
    },
    create: function (req, res) {
        var par = req.allParams();
        FileAction.upload('image', req, function (err, img) {
            if (err) {
                sails.log(err)
            } else {
                if (img.length <= 1) {
                    par.image = img[0].fd;
                    BookMaster.create(par).exec(function (err, data) {
                        if (err) {
                            sails.log(err)
                        } else {
                            res.send('BookMaster has been create');
                        }
                    });
                }
                else {
                    res.send('You can only upload 1 file');
                }
            }
        });
    },
    show: function (req, res) {
        BookMaster.find().populate('bookDetails',{ sort: 'sort ASC' }).exec(function createCB(err, data) {
            if (err) {
                sails.log(err)
            } else {
                res.send(data);
            }
        })
    },
    practice: function (req, res) {
        var id = req.param('id');
        var learnID = req.param('learnID');
        var array = require("array-extended");
        BookMaster.findOne({id: id}).populate('bookDetails',{ sort: 'sort ASC' }).exec(function createCB(err, data) {
            if (err) {
                sails.log(err)
            } else {
                var bookDetails = data.bookDetails;
                var lessons = [];
                bookDetails.forEach(function (item) {
                    lessons.push(item.lesson);
                });
                var uniqueLessons = array(lessons).unique().value();
                //uniqueLessons = array.sort(uniqueLessons);
                res.view('japtool/learning/show-book-detail', {
                    uniqueLessons: uniqueLessons,
                    learnID: learnID,
                    bookDetails: bookDetails,
                    layout: 'layout/layout-japtool'
                });
            }
        })
    },

    getLibrary: function (req, res) {
        BookMaster.find({}).populate('bookDetails',{ sort: 'sort ASC' }).exec(function createCB(err, data) {
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
                    res.view('japtool/library/index', {
                        data: data,
                        uniqueType: uniqueType,
                        arrAllLesson: arrAllLesson,
                        layout: 'layout/layout-japtool'
                    })
                }
            })
        })
    },

    getAllLibrary: function (req, res) {
        var type = req.param('type');
        BookMaster.find({type: type}).populate('bookDetails',{ sort: 'sort ASC' }).exec(function createCB(err, data) {
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
            res.view('japtool/library/showCategory', {
                data: data,
                arrAllLesson: arrAllLesson,
                layout: 'layout/layout-japtool'
            })
        })
    }
};

