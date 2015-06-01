/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
//This loads the sign-up page new.ejs
    'new': function (req, res) {
        res.view();
    },
    //Create user
    create: function (req, res) {
        //Create a user with the params sent from the sign-up form new.ejs
        User.create(req.params.all(), function userCreated(err, user) {
            //If there's an error
            if (err) {
                req.session.flash = {
                    err: err
                }
                //if error redirect back to sign-up page
                return res.redirect('/user/new');
            }


            //Long user in
            req.session.authenticated = true;
            req.session.User = user;


            //affter successfuly creating the user
            //redirect to the show action
            res.redirect('/user/show/' + user.id);

        });

    },
    //render the profile view (show.ejs)
    show: function (req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next();
            }
            res.view({
                user: user
            });
        });
    },
    //display all list user to index.ejs
    index: function (req, res, next) {
        //Get an array of all user in the user collection (ex: SQL select table)
        User.find(function foundUsers(err, users) {
            if (err) {
                return next(err);
            }
            //paa the array down to the index.ejs page
            res.view({
                users: users
            });
        });
    },
    //render the edit view edit.ejs
    edit: function (req, res, next) {
        //Find the user from the id passed in via params
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next();
            }
            res.view({
                user: user
            });
        });
    },
    //Process the info from edit view
    update: function (req, res, next) {
        User.update(req.param('id'), req.params.all(), function userUpdated(err) {
            if (err) {
                return res.redirect('/user/edit/' + req.param('id'));
            }
            res.redirect('/user/show/' + req.param('id'));
        });
    },

    //Delete user
    destroy: function (req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next('User doesn\'t exit.');
            }
            User.destroy(req.param('id'), function userDestroyed(err) {
                if (err) {
                    return next(err);
                }
            });
            res.redirect('/user');
        });
    }

};
