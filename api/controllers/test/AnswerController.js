/**
 * AnswerController
 *
 * @description :: Server-side logic for managing answers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        var id = req.param('id');
        var content = req.param('content');
        var result = req.param('result');
        Answer.create({content: content, result: result, idQuestion: id}).exec(function createCB(err, created) {
            if (err) {
                sails.log(err)
            } else {
                res.send('Answer has been created!');
            }
        })
    },

    delete: function (req, res) {
        var id = req.param('id');
        Answer.find({idQuestion: id}).exec(function createCB(err, answers) {
            if (answers.length == 0) {
                res.send('Question no has answers delete!')
            }
            else {
                answers.forEach(function (item, index) {
                    Answer.destroy({id: item.id}).exec(function createCB(err, result) {
                        if (err) sails.log(err);
                        else {
                            if (index == answers.length - 1)
                                res.send('Answers of message have been deleted too!');
                        }
                    })
                })
            }
        });
    }
};