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
    },

    submitTestAction: function (req, res) {
        var _content = req.param('content');
        var _image = req.param('image');
        var _audio = req.param('audio');
        var _video = req.param('video');
        var _level = req.param('level');
        var _sort = req.param('sort');
        var _tab = req.param('tab');
        var _category = req.param('category');
        var _other = req.param('other');

        Question.create({
            content: _content,
            image: _image,
            audio: _audio,
            video: _video,
            level: _level,
            sort: _sort,
            tab: _tab,
            category: _category,
            other: _other
        }).exec(function createCB(err, created) {
            if (err) {
                sails.log(err)
            }
            else {
                res.send('successfully!!');
            }
        })
    },

    answerAction: function (req, res) {
        Question.find().exec(function createCB(err, data) {
            res.render('answer_input', {data: data});
        })
    },

    inputAnswerAction: function (req, res) {
        var _id = req.param('id');
        var _content = req.param('content');
        var _result = req.param('result');
        Answer.create({content: _content, result: _result, idQuestion: _id}).exec(function createCB(err, created) {
            if (err) {
                sails.log(err)
            } else {
                res.send('Answer is created !');
            }
        })
    }
};

