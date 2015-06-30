/**
 * Created by XuanDT2 on 6/29/2015.
 */
module.exports = {

    /**
     * GET:
     * @param req
     * @param res
     */
    index: function (req, res) {
        res.view({layout: 'layout/japtool-learning'});
    },

    /**
     * Get: japtool/learning/learning
     * @param req
     * @param res
     */
    learning: function (req, res) {
        res.view('japtool/learning/learning', {layout: 'layout/japtool-learning'});
    },

    /**
     * GET: create layout
     * @param req
     * @param res
     */
    create: function (req, res) {
        res.view('japtool/learning/create', {layout: 'layout/japtool-learning'});
    },

    /**
     * POST: add
     * @param req
     * @param res
     */
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

                res.redirect('japtool/BookMaster/lesson/' + learning.id);
            });
        }
        catch (ex) {
            sails.log(ex);
        }
    },

    edit: function (req, res) {
        res.view('japtool/learning/edit', {layout: 'layout/japtool-learning'});
    }
};