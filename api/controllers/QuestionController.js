/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    showAction: function (req, res) {
        Question.find().populate('answers').exec(function createCB(err, created) {
            res.render('trainning', {data: created});
        })
    },

    confirmAction: function (req, res) {
        var _data = req.param('data');
        var _id = req.param('id');
        if (_data != undefined && _id != undefined) {
            Question.findOne({id: _id}).populate('answers').exec(function createCB(err, created) {
                var _ques = created;
                var _flag_answer = true;
                _data.forEach(function (data_item, data_index) {
                    _ques.answers.forEach(function (answer, answer_index) {
                        if (data_item == answer.content) {
                            if (!answer.result) {
                                _flag_answer = false;
                            }
                        }
                        if ((_data.length - 1) == data_index && (_ques.answers.length - 1) == answer_index) {
                            if (_flag_answer) {
                                res.send("Correct");
                            } else {
                                res.send("Incorrect");
                            }
                        }
                    })
                })
            });
        }
    }
};

