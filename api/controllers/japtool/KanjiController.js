/**
 * Created by TuyenTV1 on 7/10/2015.
 */
module.exports = {
    list: function (req, res) {
        var extractDataCondition = req.param('condition');
        Kanji.selectByLevel({condition: extractDataCondition}, function (err, kanji) {
            if (err) return res.send(err.status);

            res.render('japtool/kanji/list', {'kanjis': kanji});
        });
    },
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
        }
    }
}