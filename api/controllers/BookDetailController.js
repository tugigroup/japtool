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
        BookMaster.find().exec(function createCB(err, data){
            res.view('test/book-detail', {data:data});
        })
    },
    show: function (req, res) {
        BookDetail.find().populate('subLesson').exec(function createCB(err, data) {
            if (err) {
                sails.log(err)
            } else {
                res.send(data);
            }
        })
    }
};

