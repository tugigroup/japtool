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
        var user;
        var library;
        var group;
        var voca;
        User.count().exec(function (err, u) {
            if (err) {
                user = 0;
            }
            else {
                user = u;
            }
            BookMaster.count().exec(function (err, l) {
                if (err) {
                    library = 0;
                }
                else {
                    library = l
                }
                ChatGroup.count().exec(function (err, g) {
                    if (err) {
                        group = 0;
                    }
                    else {
                        group = g;
                    }
                    Vocabulary.count().exec(function (err, v) {
                        if (err) {
                            voca = 0;
                        }
                        else {
                            voca = v;
                        }
                        res.view({
                            user: user,
                            library: library,
                            group: group,
                            voca: voca
                        });
                    })
                })
            })
        })

    },

    getContent: function (req, res) {
        try {
            SelfLearning.find({user: req.session.User.id})
                .populate('bookMaster')
                .populate('userLearnHistories').exec(function (err, selfLearnings) {
                    if (err) {
                        sails.log("Err when read data from server:");
                        return res.serverError(err);
                    }
                    //sails.log("Book Use History All.");
                    //sails.log(selfLearnings);
                    if (selfLearnings == null || selfLearnings == undefined) {
                        return res.json({err: "Error"});
                    }
                    res.view('japtool/home/home', {selfLearnings: selfLearnings});
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