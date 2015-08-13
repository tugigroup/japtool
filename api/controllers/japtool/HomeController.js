/**
 * Created by TuyenTV1 on 6/22/2015.
 */
var async = require('async');
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
            limit: 2,
            sort: 'createdAt DESC'
        }).populate('bookMaster').exec(function (err, listLessons) {
            if (err) {
                if (err) return res.serverError(err);
            } else {
                res.view('japtool/home/home', {listLessons: listLessons});
                //var count = 0;
                //var listItems_array = [];
                //async.series([
                //    function (callback) {
                //        listLessons.forEach(function (item) {
                //            var bookMasterId = item.bookMaster.id;
                //            BookDetail.find({
                //                bookMaster: bookMasterId,
                //                subLesson: {'!': 'Luyện tập'},
                //                sort: 'createdAt ASC'
                //            }).exec(function (err, listItems) {
                //                if (err) {
                //                    callback(err);
                //                } else {
                //                    count++;
                //                    var listLessonsL = listLessons.length;
                //                    listItems_array.push(listItems)
                //                    if (count == listLessonsL) {
                //                        callback(null, res.view('japtool/home/home', {
                //                            listItems: listItems_array,
                //                            listLessons: listLessons
                //                        }));
                //                    }
                //                }
                //            })
                //        });
                //    }
                //])


            }
        })
        //SelfLearning.find({
        //    where: {user: userId},
        //    limit: 5,
        //    skip: 2
        //}).populate('bookMaster').exec(function (err, listLessonsSkip) {
        //    if (err) {
        //        if (err) return res.serverError(err);
        //    } else {
        //        var count = 0;
        //        var listItems_array = [];
        //        async.series([
        //            function (callback) {
        //                listLessonsSkip.forEach(function (itemSkip) {
        //                    var bookMasterId = itemSkip.bookMaster.id;
        //                    BookDetail.find({
        //                        bookMaster: bookMasterId,
        //                        subLesson: {'!': 'Luyện tập'},
        //                        sort: 'createdAt ASC'
        //                    }).exec(function (err, listItemsSkip) {
        //                        if (err) {
        //                            callback(err);
        //                        } else {
        //                            count++;
        //                            var listLessonsL = listItemsSkip.length;
        //                            console.log(listItemsSkip);
        //                            listItems_array.push(listItemsSkip)
        //                            if (count == listLessonsL) {
        //                                callback(null, res.view('japtool/home/home', {
        //                                    listItemsSkip: listItems_array,
        //                                    listLessonsSkips: listLessonsSkip
        //                                }));
        //                            }
        //                        }
        //                    })
        //                });
        //            }
        //        ])
        //    }
        //})
    },
    lessonHome: function (req, res) {
        var bookMasterId = req.param('bookMasterId');
        var bookMasterIdL = bookMasterId.length;
        var listItems_array = [];
        var count = 0;
        for (i = 0; i < bookMasterIdL; i++) {
            BookDetail.find({
                bookMaster: bookMasterId[i],
                subLesson: {'!': 'Luyện tập'},
                sort: 'createdAt ASC'
            }).exec(function (err, listItems) {
                if (err) {
                    callback(err);
                } else {
                    count++;
                    listItems_array.push(listItems);
                    if (count == bookMasterIdL) {
                        console.log(bookMasterId);
                        console.log(listItems_array);
                        res.render('japtool/home/lessonHome', {
                            listItems: listItems_array,
                            bookMasterId: bookMasterId
                        });
                    }
                }
            })
        }

    }
}
