/**
 * ChatGroupController
 *
 * @description :: Server-side logic for managing chatgroups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getMessage: function (req, res) {
        var params = req.allParams();
        ChatGroup.create(params).exec(function createCB(err, chat) {
            if (err) {
                sails.log(err)
            }
            else {
                ChatGroup.publishCreate({id: chat.id, msg: chat.message, userID: chat.userID});
                res.ok();
            }
        });
    },
    createRes: function (req, res) {
        ChatGroup.watch(req.socket);
        res.ok();
    }
};

