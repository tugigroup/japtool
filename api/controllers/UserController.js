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
    },
    //Find user with data from input
    searchUser: function (req, res, next) {
        var id_origin = req.param('id_origin');
        User.findByUsername(req.param('username'), function searchUser(err, user) {
            if (err) {
                res.send(400);
            } else {
                res.render('user/list-find-friends', {id_origin:id_origin, ob: user});
            }
        })
    },
    //Add Friend of user to collection with module "One to Many"
    addBuddy:function(req,res){
        var users = req.param('users');
        var user_id = req.param('user_id');
        var username = req.param('name');
        Buddy.create({name:username, user_id:user_id,buddyOf:users}, function userCreated(err, buddy) {
            if (err) {
                res.send(400);
            } else {
                res.redirect('/user/show/' + users);
            }
        })
    },
    //Find all Friend of User
    findBuddy:function(req,res){
        var id = req.param('idUser');
        User.findOne(id).populate('buddy').exec(function findBuddy(err, buddys) {
            if (err) {
                res.send(400);
            } else {
           //res.send(buddys);
            res.view('user/list-friends',{buddys:buddys})
            }
        });
    }

}
