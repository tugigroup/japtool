/**
 * Created by TuyenTV1 on 7/10/2015.
 */
module.exports = {
  list: function (req, res) {
    var extractDataCondition = req.param('condition');
    Kanji.selectByLevel({condition: extractDataCondition}, function (err, kanjis) {
      res.render('japtool/kanji/list', {'kanjis': kanjis});
    });
  },
  //Đây thực chất là hàm exercise nhưng vì chưa có link đến đây, nên để tạm là list để test
  exercise: function (req, res) {
    var extractDataCondition = req.param('condition');
    Kanji.selectByLevel({condition: extractDataCondition}, function (err, kanjis) {
      if (err) return res.send(err.status);
      var min = 1;
      var max = kanjis.length;
      kanjis.forEach(function (item, index) {
        var randomArr = [];
        for (var i = 0; randomArr.length < 3; i++) {
          var randomResult = Math.floor(Math.random() * (max - min) + min);
          if (!(randomArr.indexOf(randomResult) > -1) && randomResult != index) {
            randomArr[randomArr.length] = kanjis[randomResult].hanviet;
          }
        }
        randomArr.push(item.hanviet);
        randomArr.sort();
        //console.log(item.hanviet, randomArr);
        item.randomKanjis = randomArr;
      });
      res.render('japtool/kanji/exercise', {'kanjis': kanjis});
    });
  },
  _config: {
    locals: {
      layout: 'layout/layout-japtool'
    }
  }
}
