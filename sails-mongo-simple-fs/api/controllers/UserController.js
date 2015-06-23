/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        User.find(function (err, users) {
            res.view({users: users});
        });
        //User.find({"address.email": "kaka@gmail.com"}, function (err, users) {
        //res.view({users: users});
        //});
    },

    new: function (req, res) {
        res.view();
    },

    create: function (req, res) {
        User.create(req.params.all(), function (err, user) {
            res.redirect("/user/index");
        });
    },

    edit: function (req, res) {
        User.findOne({'id': req.param('id')}, function (err, user) {
            res.view({user: user});
        });
    },

    update: function (req, res) {
        User.update({'id': req.param('id')}, req.params.all(), function (err, user) {
            res.redirect("/user/index");
        });
    }
};