/**
 * BookMasterController
 *
 * @description :: Server-side logic for managing bookmasters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        var params = req.allParams();
        BookMaster.create(params).exec(function (err, data) {
            if (err) {
                sails.log(err)
            } else {
                res.send('BookMaster has been create');
            }
        })
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
                res.view('japtool/learning/show-book-detail', {uniqueLessons:uniqueLessons, bookDetails:bookDetails, layout: 'layout/japtool-learning'});
            }
        })
    }
};

