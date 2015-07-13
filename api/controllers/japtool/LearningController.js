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
        BookUseHistory.find({userId:req.session.User.id})
          .populate('bookMaster')
          .populate('userLearnHistories').exec(function (err, bookUseHistories) {
          if (err) {
            sails.log("Err when read data from server:");
            return res.serverError(err);
          }
          if (bookUseHistories == null|| bookUseHistories==undefined) {
            return res.json({err: "Error"});
          }
          bookUseHistories.forEach(function(bookUse){
            sails.log(bookUse.bookMaster);
          });
          //sails.log(bookUseHistories);
          res.view('japtool/home/home',{bookUseHistories:bookUseHistories});
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
            var notes= req.param('notes');
            var bookMaster = req.param('bookMaster');
            var startDate = req.param('startDate');
            var finishDate = req.param('finishDate');
            Learning.create({
                notes:notes,
                startDate:startDate,
                finishDate:finishDate,
                bookMaster:bookMaster,
                user:userId
            }).exec(function (err, learning) {
                if (err) {
                    return res.json({err: err});
                }
                if (!learning) {
                    return res.json({err: "Error"});
                }
                BookUseHistory.create({
                    userId:userId,
                    bookMaster:bookMaster,
                    startDate:startDate,
                    finishDate:finishDate,
                    learning:learning.id
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
        Learning.find().populate('bookMaster').exec(function (err, learnings) {
            if (err) {
                sails.log("Loi cmnr dm")
            }
            else {
                res.view({
                    learnList: learnings
                });
            }


        })
    },
    deleteLearning: function (req, res) {
        var id = req.param('id');
        Learning.destroy({id: id}).exec(function (err, ok) {
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
