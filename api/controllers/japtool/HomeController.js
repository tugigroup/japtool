/**
 * Created by TuyenTV1 on 6/22/2015.
 */
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
      limit: 3,
      sort: 'createdAt DESC'
    }).populate('bookMaster').exec(function (err, listLessons) {
      if (err) {
        if (err) return res.serverError(err);
      } else {
          res.view('japtool/home/home', {listLessons: listLessons});

      }
    })

  },
  limitMasterBook: function (req, res) {
    userId = req.session.User.id;
    var start = parseInt(req.param('start'));
    SelfLearning.find({
      where: {user: userId},
      limit: 1,
      skip:start,
      sort: 'createdAt DESC'
    }).populate('bookMaster').exec(function (err, listLessons) {
      if (err) {
        if (err) return res.serverError(err);
      } else {
        res.render('japtool/home/limitLesson', {
          listLessons: listLessons
        });
      }
    })

  }
  ,
  lessonHome: function (req, res) {
    var bookMasterId = req.param('bookMasterId');
    var selfLearning = req.param('selfLearning');
    console.log(selfLearning);
    var moreBookMasterId = req.param('moreBookMasterId');
    if (!moreBookMasterId || moreBookMasterId == undefined) {
      var bookMasterIdL = bookMasterId.length;
    }else{
      var moreBookMasterIdL = moreBookMasterId.length;
    }
    var listItems_array = [];
    var count = 0;
    if (!moreBookMasterId || moreBookMasterId == undefined) {
      for (i = 0; i < bookMasterIdL; i++) {
        BookMaster.find({id: bookMasterId[i], sort: 'createdAt DESC'}).populate('bookDetails', {
          subLesson: {'!': 'Luyện tập'},
          sort: 'createdAt ASC'
        }).exec(function (err, listItems) {
          if (err) {
            console.log(err);
          } else {
            count++;
            listItems_array.push(listItems);
            //UserLearnHistory.find({selfLearning:selfLearning}).exec(function(err,selfLesson){
            //  if (err) {
            //    console.log(err);
            //  } else {
            //    console.log('check',selfLesson);
            //  }
            //})
            if (count == bookMasterIdL) {
              res.render('japtool/home/lessonHome', {
                listItems: listItems_array
              });
            }
          }
        })
      }
    } else {
      for (i = 0; i < moreBookMasterIdL; i++) {
        BookMaster.find({id: moreBookMasterId[i], sort: 'createdAt DESC'}).populate('bookDetails', {
          subLesson: {'!': 'Luyện tập'},
          sort: 'createdAt ASC'
        }).exec(function (err, listItems) {
          if (err) {
            console.log(err);
          } else {
            count++;
            listItems_array.push(listItems);
            if (count == moreBookMasterIdL) {
              res.render('japtool/home/limitLessonHome', {
                listItems: listItems_array
              });
            }
          }
        })
      }
    }


  }
}
