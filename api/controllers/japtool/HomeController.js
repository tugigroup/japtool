/**
 * Created by TuyenTV1 on 6/22/2015.
 */
module.exports = {
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
        }
    },
//This loads index.ejs
    index: function (req, res) {
        var b = new Array();
        var array = require("array-extended");
        try {
            SelfLearning.find({user: req.session.User.id})
                .populate('bookMaster')
                .populate('userLearnHistories').exec(function (err, selfLearnings) {
                    if (err) {
                        sails.log("Err when read data from server:");
                        return res.serverError(err);
                    }
                    else {
                        if (selfLearnings.length > 0) {
                            for (var i = 0; i < selfLearnings.length; i++) {

                                BookMaster.findOne({id: selfLearnings[i].bookMaster.id}).populate('bookDetails', {sort: 'sort ASC'}).exec(function createCB(err, data) {
                                    if (err) {
                                        sails.log("Lois")
                                    } else {
                                        var bookDetails = data.bookDetails;
                                        var lessons = [];
                                        bookDetails.forEach(function (item, index) {
                                            if (index == 0) {
                                                lessons.push(data.id);
                                            }
                                            lessons.push(item.lesson);
                                        });
                                        var uniqueLessons = array(lessons).unique().value();
                                        b.push(uniqueLessons);
                                        if (b.length == selfLearnings.length) {
                                            res.view('japtool/home/home', {selfLearnings: selfLearnings, b: b});
                                        }
                                        else {
                                        }
                                    }
                                })
                            }
                        }
                        else {
                            res.view('japtool/home/home', {selfLearnings: selfLearnings, b: b});
                        }
                    }


                });

        }
        catch (ex) {
            sails.log(ex);
        }
    }

}

/**
 * Created by TuyenTV1 on 6/22/2015.
 */