/**
 * ContactController
 *
 * @description :: Server-side logic for managing Contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        User.findOne({'id': req.param('id')}, function (err, user) {
            res.view({user: user});
        })
    },

    new: function (req, res) {
        User.findOne({'id': req.param('id')}, function (err, user) {
            res.view({user: user});
        });
    },

    create: function (req, res) {

        var id = req.param('id');
        var contact = {
            'email': req.param('email'),
            'phone': req.param('phone')
        };
        sails.log(req.param('email'));
        User.findOne({id: id}).exec(function createCB(err, user) {
            var arr = [];
            arr = user.contacts;
            arr.push(contact);
            sails.log(arr);
            User.update({id: id}, {contacts: arr}).exec(function afterwards(err, updated) {
                if (err) {
                    sails.log(err);
                }
                sails.log(updated);
                res.redirect('/contact/index/?id=' + id);
            });
        });
    },

    edit: function (req, res) {
        var id = req.param('id');
        var email = req.param('email');
        var icontact;


        User.findOne({id: id}).exec(function findUserSingle(err, user) {

            user.contacts.forEach(function getContact(item) {
                if (item['email'] == email) {
                    icontact = {
                        email: email,
                        phone: item.phone
                    };
                    //sails.log(item);
                    res.view({contact: item, id: id});
                }

            });

        });
    },

    update: function (req, res) {
        var id = req.param('id');
        var email = req.param('email');
        var phone = req.param('phone');

        User.findOne({id: id}).exec(function createCB(err, user) {
            if (err) {
                sails.log(err);
            }
            else {
                //User.update({id: id, "contacts[email]": email}, {"contacts[phone]": phone}).exec(function (err, data) {
                //if (err) {
                //sails.log(err);
                //}
                //else {
                //res.redirect("/contact/index/?id=" + id);
                //}
                //});
                user.contacts.forEach(function getContact(item) {
                    var icontact;
                    if (item['email'] == email) {
                        icontact = {
                            email: email,
                            phone: phone
                        };
                        item.phone = phone;
                        sails.log(item);
                        user.save();
                        res.redirect("/contact/index/?id=" + id);
                    }
                });
            }
        });
    },

    delete: function (req, res) {

        var id = req.param('id');
        var email = req.param('email');

        User.findOne({id: id}).exec(function createCB(err, user) {
            if (err) {
                sails.log(err);
            }
            else {
                var i = 0;
                user.contacts.forEach(function (item) {
                    if (item['email'] == email) {
                        sails.log(item);
                        sails.log(i);
                        user.contacts.splice(i, 1);
                        user.save();
                        res.redirect("/contact/index/?id=" + id);
                    }
                    i++;
                });
            }
        });
    }
};
