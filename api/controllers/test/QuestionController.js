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
        var level = req.param('level');
        var sort = req.param('sort');
        var tab = req.param('tab');
        var category = req.param('category');
        var other = req.param('other');

        req.file('video').upload({
            adapter: require('skipper-gridfs'),
            uri: 'mongodb://localhost:27017/japtool.videos'
        }, function (errVideo, videos) {
            if (errVideo)
                return res.serverError(errVideo);
            else {
                req.file('audio').upload({
                    adapter: require('skipper-gridfs'),
                    uri: 'mongodb://localhost:27017/japtool.audios'
                }, function (errAudio, audios) {
                    if (errAudio)
                        return res.serverError(errAudio);
                    else {
                        req.file('image').upload({
                            adapter: require('skipper-gridfs'),
                            uri: 'mongodb://localhost:27017/japtool.images'
                        }, function (errImage, images) {
                            if (errImage)
                                return res.serverError(errImage);
                            else {
                                sails.log(videos.length, 'video has been uploaded!');
                                sails.log(audios.length, 'audio has been uploaded!');
                                sails.log(images.length, 'image has been uploaded!');
                                var audio = null;
                                var image = null;
                                var video = null;
                                if (images.length != 0) image = images[0].fd;
                                if (audios.length != 0) audio = audios[0].fd;
                                if (videos.length != 0) video = videos[0].fd;
                                if (image != null || audio != null || video != null) {
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
                                            res.send("Question has been created!");
                                        }
                                    })
                                } else {
                                    Question.create({
                                        content: content,
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
                                            res.send("Question has been created!");
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        });
    },

    getImg: function (req, res) {
        var fd = req.param('fd');
        if (fd == null) {
            res.send('');
        } else {
            var comm = require('../../common/common');
            var skipperAdapter = comm.skipperAdapter('images');
            skipperAdapter.read(fd, function (error, file) {
                if (error) {
                    res.json(error);
                } else {
                    res.contentType('image/jpg');
                    res.send(new Buffer(file));
                }
            });
        }
    },

    getAudio: function (req, res) {
        var fd = req.param('fd');
        if (fd == null) {
            res.send('');
        } else {
            var comm = require('../../common/common');
            var skipperAdapter = comm.skipperAdapter('audios');
            skipperAdapter.read(fd, function (error, file) {
                if (error) {
                    res.json(error);
                } else {
                    res.contentType('audio/wav');
                    res.send(new Buffer(file));
                }
            });
        }
    },

    getVideo: function (req, res) {
        var fd = req.param('fd');
        if (fd == null) {
            res.send('');
        } else {
            var comm = require('../../common/common');
            var skipperAdapter = comm.skipperAdapter('videos');

            skipperAdapter.read(fd, function (error, file) {
                if (error) {
                    res.json(error);
                } else {
                    res.contentType('video/mp4');
                    res.send(new Buffer(file));
                }
            });
        }
    },

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
        var comm = require('../../common/common');
        Question.destroy({id: id}).exec(function (err, question) {
            if (err) {
                sails.log(err)
            } else {
                if (question[0].image != null) {
                    var skipperAdapter = comm.skipperAdapter('images');
                    skipperAdapter.rm(question[0].image, function (err, image) {
                        if (err) sails.log(err);
                        else {
                            sails.log(question[0].image, 'has been deleted!');
                        }

                    })
                }

                if (question[0].audio != null) {
                    var skipperAdapter = comm.skipperAdapter('audios');
                    skipperAdapter.rm(question[0].audio, function (err, audio) {
                        if (err) sails.log(err);
                        else {
                            sails.log(question[0].audio, 'has been deleted!');
                        }

                    })
                }

                if (question[0].video != null) {
                    var skipperAdapter = comm.skipperAdapter('videos');
                    skipperAdapter.rm(question[0].video, function (err, video) {
                        if (err) sails.log(err);
                        else {
                            sails.log(question[0].video, 'has been deleted!');
                        }
                    })
                }

                res.send('Question has been deleted!');
            }
        })
    }
};

