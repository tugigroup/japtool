/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcryptjs');
var format = require('date-format');
module.exports = {
//This loads the sign-up page new.ejs
  'new': function (req, res) {
    res.view();
  },
  //Create user
  create: function (req, res) {
    var yourAddress = {
      company: '',
      address: '',
      city: '',
      postCode: '',
      country: ''
    };
    //Create a user with the params sent from the sign-up form new.ejs
    User.create(req.params.all(), function userCreated(err, user) {
      //If there's an error
      if (err) {
        req.session.flash = {
          err: err
        }
        //if error redirect back to sign-up page
        return res.redirect('/japtool/user/new');
      }
      //Long user in
      req.session.authenticated = true;
      req.session.User = user;
      var idUser = req.session.User.id;
      //Update user address
      User.update({id: idUser}, {yourAddress: yourAddress}, function (err, updateUser) {
      });
      //after create user success, generate email include active link --> bcrypt: email + create date
      require('bcryptjs').hash(user.email + user.createdAt.toISOString(), 10, function passwordEncypted(err, encryptedLink) {
        if (err) {
          console.log('Encrypt active link failed!');
        } else {
          //send active email
          Mailer.sendActiveMail(user, 'http://localhost:1337/japtool/user/active?active=' + encryptedLink);
          //and then, redirect to recommend page
          res.redirect('/japtool/user/');
        }
      });
    });
  },
  //active account after new user created
  active: function (req, res) {
    var active = req.param('active');
    //compare active link with db, if equal --> change user status = true
    bcrypt.compare(req.session.User.email + req.session.User.createdAt, active, function (err, valid) {
      console.log('DB: ', req.session.User.email + req.session.User.createdAt);
      //if the active link doesn't match
      if (err || !valid) {
        return res.view('japtool/user/active-account-success', {code: 'fail'});
      }
      //everything is valid,change user status and save to db, session
      else {
        User.update(req.session.User._id, {status: true}, function (err, userUpdated) {
          if (err) {
            return res.view('japtool/user/active-account-success', {
              code: 'fail'
            });
          } else {
            //Luu lại status vào session
            req.session.User.status = userUpdated[0].status;
            return res.view('japtool/user/active-account-success', {
              code: 'success'
            });
          }
        });
      }
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
      res.view({user: user});
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
      Country.find(function (err, listCountrys) {
        if (err) {
          return next(err);
        }
        res.render('japtool/user/edit-user-information', {
          listCountry: listCountrys,
          user: user
        });
      });
    });
  },
  //Process the info from edit view
  update: function (req, res, next) {
    var id = req.param('userInfoId');
    User.update(id, req.params.all(), function (err, user) {
      if (err) {
        return next(err);
      }
      res.render('japtool/user/show-user-info', {user: user[0]});
    });
  },
  //edit avatar user
  editAvatar: function (req, res, next) {
    var userCodeID = req.param('userCodeID');
    var userAvatar = req.param('userAvatar');
    FileAction.rm(userAvatar, function (err, file) {
      if (err) {
        sails.log(err);
      }
    });
    FileAction.upload('uploadAvatar', req, function (err, img) {
      if (err) {
        res.negotiate(err);
      } else {
        avatarimg = img[0].fd;
        User.update({id: userCodeID}, {avatar: avatarimg}, function (err, updateAvatar) {
          if (err) {
            sails.log(err)
          } else {
            res.redirect('japtool/user/show/' + userCodeID)
          }
        });
      }
    });
  },
  //display all list user to index.ejs
  index: function (req, res, next) {
    //Get an array of all user in the user collection (ex: SQL select table)
    var lv;
    var crt;
    var userId = req.session.User.id
    User.findOne({id: userId}).exec(function (err, user) {
      if (err) {
      }
      else {
        lv = user.currentLevel;
        if (lv == null || lv == '') {
          /* res.redirect('japtool/user/afterLogin');*/
          res.view({
            lv: '',
            crt: ''
          });
        }
        else {
          SurveyResult.find({UserID: user.id}).exec(function (err, svuss) {
            if (err) {
            }
            else {
              crt = user.currentLearningTime;
              if (svuss == null || svuss == '') {
                res.view({
                  lv: lv,
                  crt: crt
                });
              }
              else {
                res.redirect('japtool/user/afterLogin');
              }
            }
          })
        }
      }
    })
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
      res.redirect('/japtool/auth');
    });
  },
  //Change Password
  changePass: function (req, res) {
    var id = req.param('id');
    var oldPass = req.param('oldPass');
    var newPass = req.param('newPass');
    var newPassCf = req.param('newPassCf');
    var mess = '';
    //check user pass with input pass
    bcrypt.compare(oldPass, req.session.User.encryptedPassword, function (err, valid) {
      //if the input password doesn't match the password from the database...
      if (err || !valid) {
        mess = 'Your password is invalid!';
        res.send({mess: mess, code: 'error'});
      }
      //everything is valid, encrypting password and save to db, session
      else {
        require('bcryptjs').hash(newPass, 10, function passwordEncypted(err, encryptedPassword) {
          if (err) {
            mess = 'Encrypt password failed!';
            res.send({mess: mess, code: 'error'});
          } else {
            User.update(id, {encryptedPassword: encryptedPassword}, function (err, userUpdated) {
              if (err) {
                mess = 'Update failed!';
                res.send({mess: mess, code: 'error'});
              } else {
                mess = 'Update success!';
                req.session.User.encryptedPassword = userUpdated[0].encryptedPassword;
                res.send({mess: mess, code: 'valid'});
              }
            });
          }
        });
      }
    });
    //res.send({mess: mess});
  },
  afterLogin: function (req, res) {
    res.view('japtool/user/afterLogin');
  },
  searchUser: function (req, res, next) {
    var id_origin = req.param('id_origin');
    var username = req.param('username');
    User.find({username: '%' + username + '%'}, function searchUser(err, user) {
      if (err) {
        res.send(400);
      } else {
        Buddy.find(function (err, buddy) {
          res.render('japtool/user/list-find-friends', {
            id_origin: id_origin,
            buddy: buddy,
            ob: user
          });
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
        res.view('japtool/user/list-friends', {buddys: buddys})
      }
    });
  },
  _config: {
    locals: {
      layout: 'layout/layout-japtool'
    }
  }
};
