/**
 * AnswerController
 *
 * @description :: Server-side logic for managing answers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    deleteAnswerAction: function (req, res) {
        var _id = req.param('id');
        Answer.find({idQuestion: _id}).exec(function createCB(err, answers) {
            answers.forEach(function (item, index) {
                Answer.destroy({id: item.id}).exec(function createCB(err, result) {
                    if (err) sails.log(err)
                    else {
                        if (index == answers.length - 1)
                            res.send('Answers of message have been deleted too!');
                    }
                })
            })
        });
    }
};