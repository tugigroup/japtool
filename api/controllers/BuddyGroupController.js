/**
 * BuddyGroupController
 *
 * @description :: Server-side logic for managing Buddygroups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'new_group': function (req, res) {
        res.view();
    },
    //Create Group
    create: function (req, res) {
        BuddyGroup.create(req.params.all(), function buddyGroupCreated(err, user) {
            if (err) {
                req.session.flash = {
                    err: err
                }
                return res.redirect('/user/new_group');
            }

        })
    }
};

