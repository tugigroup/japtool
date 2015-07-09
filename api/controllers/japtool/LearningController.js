/**
 * Created by NamMH on 6/29/2015.
 */
module.exports = {

    create: function (req, res) {
        res.view('japtool/learning/create');

    },
    add: function (req, res) {
        try {
            var params = req.params.all();
            Learning.create(params).exec(function (err, learning) {
                if (err) {
                    return res.json({err: err});
                }
                if (!learning) {
                    return res.json({err: "Error"});
                }
                res.redirect('japtool/learning/');
            });
        }
        catch (ex) {
            sails.log(ex);
        }
    },
    /**
     * GET: /learning/search
     * @param req
     * @param res
     */

    getBooks: function (req, res) {
        BookMaster.find().exec(function (err, books) {
            if (err) {

            }
            else {
                res.render('japtool/learning/choosebook',{
                    books:books
                });
            }
        })
    },

    index: function (req, res) {
        Learning.find().populate('bookId').exec(function (err, learnings) {
            if (err) {
                sails.log("Loi cmnr dm")
            }
            else {
                res.view({
                    learnList: learnings
                });
            }


        })
    },
    _config: {
        locals: {
            layout: 'layout/layout-japtool'
        }
    }
};