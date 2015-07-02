/**
 * Created by XuanDT2 on 6/29/2015.
 */
module.exports = {

    /**
     * GET: japtool/learning/create
     * @param req
     * @param res
     */
    create: function (req, res) {
        res.view('japtool/learning/create', {layout: 'layout/layout-japtool'});
    },

    /**
     * POST: japtool/learning/add
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
                res.redirect('japtool/learning/index/' + learning.id);
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
    search: function (req, res) {
        return res.render('japtool/learning/search', {layout: null});
    }
};