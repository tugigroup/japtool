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
            limit: 2
        }).populate('bookMaster').exec(function (err, listLessons) {
            if (err) {
                if (err) return res.serverError(err);
            } else {
                var count = 0;
                var listItems_array = [];
                async.series([
                    function (callback) {
                        listLessons.forEach(function (item) {
                            var bookMasterId = item.bookMaster.id;
                            BookDetail.find({
                                bookMaster: bookMasterId,
                                subLesson: {'!': 'Luyện tập'},
                                sort: 'createdAt ASC'
                            }).exec(function (err, listItems) {
                                if (err) {
                                    callback(err);
                                } else {
                                    count++;
                                    var listLessonsL = listLessons.length;
                                    listItems_array.push(listItems)
                                    if (count == listLessonsL) {
                                        SelfLearning.find({
                                            where: {user: userId},
                                            limit: 5,
                                            skip: 2
                                        }).populate('bookMaster').exec(function (err, listLessonsSkip) {
                                            if (err) {
                                                if (err) return res.serverError(err);
                                            } else {
                                                var count2 = 0;
                                                var listItems_array2 = [];
                                                listLessonsSkip.forEach(function (itemSkip) {
                                                    var bookMasterId = itemSkip.bookMaster.id;
                                                    BookDetail.find({
                                                        bookMaster: bookMasterId,
                                                        subLesson: {'!': 'Luyện tập'},
                                                        sort: 'createdAt ASC'
                                                    }).exec(function (err, listItemsSkip) {
                                                        if (err) {
                                                            callback(err);
                                                        } else {
                                                            count2++;
                                                            var listLessonsL = listLessonsSkip.length;
                                                            listItems_array2.push(listItemsSkip)
                                                            if (count2 == listLessonsL) {
                                                                res.view('japtool/home/home', {
                                                                    listItems: listItems_array,
                                                                    listLessons: listLessons,
                                                                    listLessonsSkips: listLessonsSkip,
                                                                    listItemsSkip: listItems_array2
                                                                });
                                                            }
                                                        }
                                                    })
                                                });

                                            }

                                        })


                                    }
                                }
                            })
                        });
                    }
                ])

            }
        })


    }
}
