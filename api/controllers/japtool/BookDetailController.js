/**
 * BookDetailController
 *
 * @description :: Server-side logic for managing bookdetails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        var params = req.allParams();
        BookDetail.create(params).exec(function createCB(err, data) {
            if (err) {
                sails.log(err)
            } else {
                res.send('BookDetail has been create');
            }
        })
    },
    getBookDetail: function (req, res) {
        BookMaster.find().exec(function createCB(err, data) {
            res.view('admin/article/book-detail', {data: data, layout: 'layout/layout-japtool'});
        })
    },
    showData: function (req, res) {
        BookDetail.find().exec(function createCB(err, data) {
            if (err) {
                sails.log(err)
            } else {
                res.send(data);
            }
        })
    },
    show: function (req, res) {
        var id = req.param('id');
        BookDetail.findOne({id: id}).exec(function createCB(err, book) {
            Question.find({id: book.useCollection}).exec(function createCB(err, data) {
                sails.log(book);
                res.view('admin/article/show-book-detail', {data: data, book: book})
            })
        })
    }
};

