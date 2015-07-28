/**
 * Created by TuyenTV1 on 7/28/2015.
 */
module.exports = {
    speech: function (req, res) {
        var extractDataCondition = '{"level": "N4", "tag" : {"contains":",speedN4,lesson1,"}}';
        Sentence.selectByLevel({condition: extractDataCondition}, function (err, sentences) {
            if (err) return res.send(err.status);
            res.view('japtool/sentence/speech', {'sentences': sentences});
        });
    },
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
        }
    }
}