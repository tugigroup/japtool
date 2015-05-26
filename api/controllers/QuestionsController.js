/**
 * QuestionsController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    showAction: function (req, res) {
        Questions.find().populate('answers').exec(function createCB(err, created) {
            res.render('trainning', {data: created});
        })
    },

    confirmAction: function (req, res) {
        var _data = req.param('data');
        Questions.findOne({id:'5562eeb351e0465c050336d1'}).populate('answers').exec(function createCB(err, created) {
            var _ques = created;
            sails.log(_ques);
        });
        _data.forEach(function (item) {
        });
        res.send("Correct");
    }
};

