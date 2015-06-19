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
                return res.redirect('/catalog/user/new');
            }
            //Long user in
            req.session.authenticated = true;
            req.session.User = user;


            //affter successfuly creating the user
            //redirect to the show action
            res.redirect('/catalog/user/show/' + user.id);

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
                return res.redirect('/catalog/user/edit/' + req.param('id'));
            }
            res.redirect('/catalog/user/show/' + req.param('id'));
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
            res.redirect('/catalog/user');
        });
    },
    //Find user with data from input
    //searchUser: function (req, res, next) {
    //    var id_origin = req.param('id_origin');
    //    var username = req.param('username');
    //    User.findByUsername(username, function searchUser(err, user) {
    //        if (err) {
    //            res.send(400);
    //        } else {
    //            res.render('user/list-find-friends', {id_origin:id_origin, ob: user});
    //        }
    //    })
    //},
    searchUser: function (req, res, next) {
        var id_origin = req.param('id_origin');
        var username = req.param('username');
        User.find({username: '%' + username + '%'}, function searchUser(err, user) {
            if (err) {
                res.send(400);
            } else {
                Buddy.find(function (err, buddy) {
                    res.render('catalog/user/list-find-friends', {id_origin: id_origin, buddy: buddy, ob: user});
                });

            }
        });

    },

    //Add Friend of user to collection with module "One to Many"
    addBuddy: function (req, res) {
        var users = req.param('id_origin_hidden');
        var user_id = req.param('userid');
        var statusBuddy = req.param('statusBuddy');
        if (statusBuddy == 1) {
            sails.log('status 1');
        }
        else if (statusBuddy == 2) {
            sails.log('status 1');
        }
        else {
            Buddy.create({user_id: user_id, statusBuddy: '2', buddyOf: users}, function userCreated(err, buddy) {
                if (err) {
                    res.send(400);
                } else {
                    res.json({isFlag: 1});
                }
            })
        }


    },
    //Find all Friend of User
    findBuddy: function (req, res) {
        var id = req.param('idUser');
        User.findOne(id).populate('buddy').exec(function findBuddy(err, buddys) {
            if (err) {
                res.send(400);
            } else {
                //res.send(buddys);
                res.view('catalog/user/list-friends', {buddys: buddys})
            }
        });
    }

}
