/**
 * Created by NamMH on 6/29/2015.
 */
module.exports = {
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
        }
    },
    home: function (req, res) {
        try {
          SelfLearning.find({user:req.session.User.id})
          .populate('bookMaster')
          .populate('userLearnHistories').exec(function (err, selfLearnings) {
          if (err) {
            sails.log("Err when read data from server:");
            return res.serverError(err);
          }
          sails.log("Book Use History All.");
          sails.log(selfLearnings);
          if (selfLearnings == null|| selfLearnings==undefined) {
            return res.json({err: "Error"});
          }
          /*selfLearnings.forEach(function(bookUse){
            sails.log(bookUse.bookMaster);
          });*/
          //sails.log(selfLearnings);
          res.view('japtool/home/home',{selfLearnings:selfLearnings});
        });
        }
        catch (ex) {
            sails.log(ex);
        }
    },
    /**
     * GET: japtool/learning/create
     * @param req
     * @param res
     */
    create: function (req, res) {
        res.view('japtool/learning/create');

    },
    add: function (req, res) {
        try {
            var userId = req.session.User.id;
            var notes = req.param('notes');
            var bookMaster = req.param('bookMaster');
            var startDate = req.param('startDate');
            var finishDate = req.param('finishDate');
            SelfLearning.create({
                notes: notes,
                startDate: startDate,
                finishDate: finishDate,
                bookMaster: bookMaster,
                user: userId
            }).exec(function (err, selfLearning) {
                if (err) {
                    return res.json({err: err});
                }
                if (!selfLearning) {
                    return res.json({err: "Error"});
                }
                BookUseHistory.create({
                    userId: userId,
                    bookMaster: bookMaster,
                    startDate: startDate,
                    finishDate: finishDate,
                    selfLearning: selfLearning
                }).exec(function (err, bookusehistory) {
                    if (err) {

                    }
                    else {
                        res.redirect('japtool/learning/');
                    }
                })

            });
        }
        catch (ex) {
            sails.log(ex);
        }
    },
    /**
     * GET: /learning/search
     * @param req
     * @param res
     */

    getBooks: function (req, res) {
        BookMaster.find().exec(function (err, books) {
            if (err) {

            }
            else {
                res.render('japtool/learning/choosebook', {
                    books: books
                });
            }
        })
    },

    index: function (req, res) {
        var arrTag=[];
        SelfLearning.find().populate('bookMaster', {sort: 'startDate'}).exec(function (err, selfLearnings) {
            if (err) {
                sails.log("Loi cmnr dm")
            }
            else {
                selfLearnings.forEach(function (item, index) {
                    arrTag.push(item.bookMaster.type);
                    if (index == (selfLearnings.length - 1)) {
                        var array = require("array-extended");
                        var uniqueType = array(arrTag).unique().value();
                        res.view( {
                            learnList: selfLearnings,
                            uniqueType: uniqueType
                        })
                    }

                })
            }
        })
    },
    deleteLearning: function (req, res) {
        var id = req.param('id');
        SelfLearning.destroy({id: id}).exec(function (err, ok) {
            if (err) {

            }
            else {
                res.redirect('japtool/learning/');
            }
        })
    },
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
        }
    }
};
