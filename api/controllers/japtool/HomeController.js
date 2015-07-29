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