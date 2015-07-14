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

    saveHistory: function (req, res) {
        var pars = req.allParams();
        //pars.startDate= new Date();
        UserLearnHistory.findOne({
            user: pars.user,
            bookDetail: pars.bookDetail,
            selfLearning: pars.selfLearning
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
                var currentDate = new Date();
                data.startDate = currentDate;
                UserLearnHistory.update({id: data.id}, {startDate: currentDate}).exec(function (err, updated) {
                    if (err) {
                        sails.log(err)
                    } else {
                        res.send('Record has update');
                    }
                })
            }
        });
    }
};

