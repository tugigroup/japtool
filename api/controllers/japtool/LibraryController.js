/**
 * Created by TuyenTV1 on 6/23/2015.
 */
module.exports = {
//This loads index.ejs
    index: function(req, res){
        res.view({ layout: 'layout/layout-japtool'});
    },
    libraryCategory:function(req,res){
        res.view('japtool/library/libraryCategory',{ layout: 'layout/layout-japtool'});
    },

    getLibrary: function (req, res) {

        BookMaster.find({}).populate('bookDetails', {sort: 'sort ASC'}).exec(function createCB(err, data) {
            var arrTag = [];
            var arrAllLesson = [];
            if (data.length == 0) {
                res.view('japtool/library/notFound',{layout: 'layout/layout-japtool'});
            } else {
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
            }

        })
    },

    getAllLibrary: function (req, res) {
        var type = req.param('type');
        BookMaster.find({type: type}).populate('bookDetails', {sort: 'sort ASC'}).exec(function createCB(err, data) {
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

}
