/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'new': function (req, res) {
        res.view('session/new');
    },
    create: function (req, res, next) {

        // Check for email and password in params sent via the form, if none
        // redirect the browser back to the sign-in form.
        if (!req.param('email') || !req.param('password')) {
            // return next({err: ["Password doesn't match password confirmation."]});

            var usernamePasswordRequiredError = [{
                name: 'usernamePasswordRequired',
                message: 'You must enter both a username and password.'
            }]

            // Remember that err is the object being passed down, whose value is another object with
            // the key of usernamePasswordRequiredError
            req.session.flash = {
                err: usernamePasswordRequiredError
            }

            res.redirect('/session/new');
            return;
        }

        // Try to find the user by there email address.
        // findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
        // User.findOneByEmail(req.param('email')).done(function(err, user) {
        User.findOneByEmail(req.param('email'), function foundUser(err, user) {
            if (err) return next(err);

            // If no user is found...
            if (!user) {
                var noAccountError = [{
                    name: 'noAccount',
                    message: 'The email address ' + req.param('email') + ' not found.'
                }]
                req.session.flash = {
                    err: noAccountError
                }
                res.redirect('/session/new');
                return;
            }

            // Compare password from the form params to the encrypted password of the user found.
            bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
                if (err) return next(err);

                // If the password from the form doesn't match the password from the database...
                if (!valid) {
                    var usernamePasswordMismatchError = [{
                        name: 'usernamePasswordMismatch',
                        message: 'Invalid username and password combination.'
                    }]
                    req.session.flash = {
                        err: usernamePasswordMismatchError
                    }
                    res.redirect('/session/new');
                    return;
                }

                // Log user in
                req.session.authenticated = true;
                req.session.User = user;

                // Change status to online
                user.online = true;
                user.save(function (err, user) {
                    if (err) return next(err);

                    // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
                    User.publishUpdate(user.id, {
                        loggedIn: true,
                        id: user.id,
                        name: user.name,
                        action: ' has logged in.'
                    });

                    // If the user is also an admin redirect to the user list (e.g. /views/user/index.ejs)
                    // This is used in conjunction with config/policies.js file
                    if (req.session.User.admin) {
                        res.redirect('/user');
                        return;
                    }

                    //Redirect to their profile page (e.g. /views/user/show.ejs)
                    res.redirect('/user/show/' + user.id);
                });
            });
        });
    }
};

