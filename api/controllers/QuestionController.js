/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    showAction: function (req, res) {
        Question.find().populate('answers').exec(function createCB(err, created) {
            res.render('test/show-test', {data: created});
        })
    },

    confirmAction: function (req, res) {
        var _data = req.param('data');
        var _id = req.param('id');
        if (_data != undefined && _id != undefined) {
            Question.findOne({id: _id}).populate('answers').exec(function createCB(err, created) {
                var _flag_asw_choose = true;
                var _i = 0;
                created.answers.forEach(function (item) {
                    if (item.result) _i++;
                });

                if (_data.length != _i) {
                    res.send("Incorrect");
                } else {
                    _data.forEach(function (data_item, data_index) {
                        created.answers.forEach(function (answer, answer_index) {
                            if (data_item == answer.content && !answer.result) {
                                _flag_asw_choose = false;
                            }
                            if ((_data.length - 1) == data_index && (created.answers.length - 1) == answer_index) {
                                if (_flag_asw_choose) {
                                    res.send("Correct");
                                } else {
                                    res.send("Incorrect");
                                }
                            }
                        })
                    })
                }
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
                res.send('Question has been created!');
            }
        })
    },

    answerAction: function (req, res) {
        Question.find().exec(function createCB(err, data) {
            res.render('test/input-answer', {data: data});
        })
    },

    questionAction: function (req, res) {
        res.render('test/input-question');
    },

    inputAnswerAction: function (req, res) {
        var _id = req.param('id');
        var _content = req.param('content');
        var _result = req.param('result');
        Answer.create({content: _content, result: _result, idQuestion: _id}).exec(function createCB(err, created) {
            if (err) {
                sails.log(err)
            } else {
                res.send('Answer has been created!');
            }
        })
    },

    deleteQuestionAction: function (req, res) {
        var _id = req.param('id');
        Question.destroy({id: _id}).exec(function (err, question) {
            if (err) {
                sails.log(err)
            } else {
                /*Answer.find({idQuestion: _id}).exec(function createCB(err, answer) {
                 answer.forEach(function (item) {
                 item.destroy({}).exec(function (err, created) {
                 if (err) {
                 sails.log(err)
                 } else {
                 res.send('Question has been deleted!');
                 }
                 })
                 })
                 });*/
                res.send('Question has been deleted!');
            }
        })
    }
};

