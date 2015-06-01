/**
 * AnswerController
 *
 * @description :: Server-side logic for managing answers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    deleteAnswerAction: function (req, res) {
        var _id = req.param('id');
        Answer.find({idQuestion: _id}).exec(function createCB(err, answer) {
            answer.forEach(function (item) {
                sails.log(item);
                item.destroy().exec(function (err, created) {
                    if (err) {
                        sails.log(err)
                    } else {
                        res.send('Answer of question has been deleted!');
                    }
                })
            })
        });
    }
};

