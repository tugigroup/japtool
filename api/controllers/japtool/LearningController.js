/**
 * Created by NamMH on 6/29/2015.
 */
module.exports = {
    _config:{
        locals:{
            layout: 'layout/layout-japtool'
        }
    },
    home:function (req, res) {
      try {
        /*Create Sample for Book User History*/
        /*BookMaster.find().exec(function(err,bookMasters){
          if (err) {
            sails.log("Error: " + err);
            return res.serverError(err);
          }
          sails.log("Total book Master is: " +  bookMasters.length)
          for(var b=0;b<bookMasters.length;b++)
          {
            for(var i=0;i<10;i++)
            {
              BookUseHistory.create({
                userId:req.session.User.id,
                groupId:null,
                bookID: bookMasters[b].id,
                finishRate: Utils.randomIntInc(1,100),
                startDate: new Date(),
                finishDate: new Date(),
                bookMaster:bookMasters[b]
              }).exec(function (err, bookUseHistory)
              {
                if (err) {
                  return res.serverError(err);
                }
                sails.log("This Is Book:");
                sails.log(bookUseHistory);
                for(var j=0;j<10;j++) {
                  UserLearnHistory.create({
                    userId: req.session.User.id,
                    groupId: null,
                    bookID: bookUseHistory.id,
                    lesson: "lesson " + j,
                    subLesson: "subLesson " + j,
                    mark: Utils.randomIntInc(1,10),
                    startDate: new Date(),
                    finishDate: new Date(),
                    bookUseHistory: bookUseHistory
                  }).exec(function (err, userLearnHistory) {
                    if (err) {
                      return res.serverError(err);
                    }
                    sails.log("This Is Learn History:");
                    sails.log(userLearnHistory);

                  });
                }
              });
            }
          }
        });*/
        /*Ended Create Sample for Book User History*/
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
          //sails.log(bookUseHistories);
          /*Calculator for Till now you have miss following lesson*/
          var missLessons = new Array()
          /*var index=0;
          bookUseHistories.forEach(function(item){
            var totalDate = item.finishDate - item.startDate;
            //sails.log("Total Lession: " + (++index) + "-" + countLesson(item.bookMaster.id));
          });*/
          sails.log("Return to View.");
          res.view('japtool/home/home',{bookUseHistories:bookUseHistories, missLessons:missLessons});
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
            var params = req.params.all();
            Learning.create(params).exec(function (err, learning) {
                if (err) {
                    return res.json({err: err});
                }
                if (!learning) {
                    return res.json({err: "Error"});
                }
                res.redirect('japtool/learning/');
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
                res.render('japtool/learning/choosebook',{
                    books:books
                });
            }
        })
    },

    index: function (req, res) {
        Learning.find().populate('bookId').exec(function (err, learnings) {
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
    deleteLearning:function(req,res){
        var id= req.param('id');
        Learning.destroy({id:id}).exec(function(err,ok){
            if(err){

            }
            else{
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