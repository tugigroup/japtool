/**
 * BookMasterController
 *
 * @description :: Server-side logic for managing bookmasters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    createBook: function (req, res) {
        res.view('admin/article/book-master',{layout: 'layout/layout-japtool'});
    },
    create: function (req, res) {
        var par = req.allParams();
        fileAction.upload('image', 'files', req, function (err, img) {
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
        BookMaster.find().populate('bookDetail').exec(function createCB(err, data) {
            if (err) {
                sails.log(err)
            } else {
                res.send(data);
            }
        })
    },
    lesson: function (req, res) {
        var id = req.param('id');
        var array = require("array-extended");
        BookMaster.findOne({id: id}).populate('bookDetail').exec(function createCB(err, data) {
            if (err) {
                sails.log(err)
            } else {
                var bookDetails = data.bookDetail;
                var lessons = [];
                bookDetails.forEach(function (item) {
                    lessons.push(item.lesson);
                });
                var uniqueLessons = array(lessons).unique().value();
                res.view('japtool/learning/show-book-detail', {
                    uniqueLessons: uniqueLessons,
                    bookDetails: bookDetails,
                    layout: 'layout/layout-japtool'
                });
            }
        })
    },

    readImg: function (req, res) {
        var fd = req.param('fd');
        if (fd != '') {
            fileAction.read(fd, 'files', 'image/jpg', res);
        }
    },

    getLibrary: function (req, res) {
        BookMaster.find({}).populate('bookDetail').exec(function createCB(err, data) {
            var arrTag = [];
            data.forEach(function (item, index) {
                arrTag.push(item.category);
                if (index == (data.length - 1)) {
                    var array = require("array-extended");
                    var uniqueTag = array(arrTag).unique().value();
                    res.view('japtool/library/index', {
                        data: data,
                        uniqueTag: uniqueTag,
                        layout: 'layout/layout-japtool'
                    })
                }
            })
        })
    }
};
