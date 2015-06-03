/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    show: function (req, res) {
        Question.find().populate('answers').exec(function createCB(err, created) {
            res.render('test/show-test', {data: created});
        })
    },

    confirm: function (req, res) {
        var data = req.param('data');
        var id = req.param('id');
        if (data != undefined && id != undefined) {
            Question.findOne({id: id}).populate('answers').exec(function createCB(err, created) {
                var flag_asw_choose = true;
                var i = 0;
                created.answers.forEach(function (item) {
                    if (item.result) i++;
                });

                if (data.length != i) {
                    res.send("Incorrect");
                } else {
                    data.forEach(function (data_item, data_index) {
                        created.answers.forEach(function (answer, answer_index) {
                            if (data_item == answer.content && !answer.result) {
                                flag_asw_choose = false;
                            }
                            if ((data.length - 1) == data_index && (created.answers.length - 1) == answer_index) {
                                if (flag_asw_choose) {
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

    create: function (req, res) {
        var content = req.param('content');
        //var image = req.param('image');
        var audio = req.param('audio');
        var video = req.param('video');
        var level = req.param('level');
        var sort = req.param('sort');
        var tab = req.param('tab');
        var category = req.param('category');
        var other = req.param('other');


        req.file('image').upload({
            adapter: require('skipper-gridfs'),
            uri: 'mongodb://localhost:27017/japtool.fs'
        },function (err, files) {
            if (err)
                return res.serverError(err);

            else{
                sails.log( files.length + ' file(s) uploaded successfully!');
                sails.log( files);
                return res.ok();
            }

        });

        Question.create({
            content: content,
            //image: image,
            audio: audio,
            video: video,
            level: level,
            sort: sort,
            tab: tab,
            category: category,
            other: other
        }).exec(function createCB(err, created) {
            if (err) {
                sails.log(err)
            }
            else {
                res.send('Question has been created!');
            }
        })
    },

    /*create: function (req, res) {
        path = require('path');
        var urlImage = path.basename('D:\hello\TBL114.gif');
        var content = req.param('content');
        var image = req.param('image');
        var audio = req.param('audio');
        var video = req.param('video');
        var level = req.param('level');
        var sort = req.param('sort');
        var tab = req.param('tab');
        var category = req.param('category');
        var other = req.param('other');

        req.file(urlImage).upload(function (err, files) {
            if (err){
                return res.serverError(err);
                sails.log(res.headersSent)
            }
            else{
                sails.log(res.headersSent);
                return res.json({
                    message: files.length + ' file(s) uploaded successfully!',
                    files: files
                });
            }

        });

        Question.create({
            content: content,
            image: image,
            audio: audio,
            video: video,
            level: level,
            sort: sort,
            tab: tab,
            category: category,
            other: other
        }).exec(function createCB(err, created) {
            if (err) {
                sails.log(err)
            }
            else {
                res.send('Question has been created!');
            }
        })
    },*/

    getFormAnswer: function (req, res) {
        Question.find().exec(function createCB(err, data) {
            res.render('test/input-answer', {data: data});
        })
    },

    getForm: function (req, res) {
        res.render('test/input-question');
    },


    delete: function (req, res) {
        var id = req.param('id');
        Question.destroy({id: id}).exec(function (err, question) {
            if (err) {
                sails.log(err)
            } else {
                res.send('Question has been deleted!');
            }
        })
    }
};

