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
        var limitLesson = 3;
        SelfLearning.find({
            where: {user: userId},
            limit: limitLesson,
            sort: 'updatedAt DESC'
        }).populate('bookMaster').exec(function (err, listLessons) {
            if (err) {
                if (err) return res.serverError(err);
            } else {

                res.view('japtool/home/home', {listLessons: listLessons});


            }
        })
    },
    lessonHome: function (req, res) {
        var bookMasterId = req.param('bookMasterId');
        var bookMasterIdL = bookMasterId.length;
        var listItems_array = [];
        var count = 0;
        for (i = 0; i < bookMasterIdL; i++) {
            BookMaster.find({id: bookMasterId[i],sort: 'createdAt DESC'}).populate('bookDetails', {
                subLesson: {'!': 'Luyện tập'},
                sort: 'createdAt ASC'
            }).exec(function(err, listItems) {
                if (err) {
                    console.log(err);
                } else {
                    count++;
                    listItems_array.push(listItems);
                    if (count== bookMasterIdL) {

                            res.render('japtool/home/lessonHome', {
                                listItems: listItems_array
                            });


                    }
                }
            })
        }

    },
    loadMore: function (req, res) {
        userId = req.session.User.id;
        var limitLesson = 0;
        var limitValue = parseInt(req.param('loadValue'));
        if(limitValue || limitValue != undefined){
            limitLesson = limitLesson + limitValue;
        }
        SelfLearning.find({
            where: {user: userId},
            limit: 1,
            sort: 'createdAt DESC',
            skip: limitLesson
        }).populate('bookMaster').exec(function (err, listLessons) {
            if (err) {
                if (err) return res.serverError(err);
            } else {
                console.log(listLessons);
                res.render('japtool/home/limitLesson', {
                    listLessons: listLessons
                });
            }
        })
    },
    lessonMoreHome: function (req, res) {
        var bookMasterId = req.param('bookMasterId');
        var bookMasterIdL = bookMasterId.length;
        var listItems_array = [];
        var limitLesson = req.param('loadValue');
        var count = 0;
        for (i = 0; i < bookMasterIdL; i++) {
            BookMaster.find({id: bookMasterId[i],sort: 'createdAt DESC'}).populate('bookDetails', {
                subLesson: {'!': 'Luyện tập'},
                sort: 'createdAt ASC'
            }).exec(function(err, listItems) {
                if (err) {
                    console.log(err);
                } else {
                    count++;
                    listItems_array.push(listItems);
                    if (count== bookMasterIdL) {
                        res.render('japtool/home/lessonHomeLimit', {
                            listItemsMore: listItems_array
                        });

                    }
                }
            })
        }

    }
}
