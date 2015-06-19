/**
 * BookMasterController
 *
 * @description :: Server-side logic for managing bookmasters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        var params = req.allParams();
        BookMaster.create(params).exec(function (err, data) {
            if (err) {
                sails.log(err)
            } else {
                res.send('BookMaster has been create');
            }
        })
    },
    show: function (req, res) {
        BookMaster.find().populate('bookDetail').exec(function createCB(err, data) {
            if (err) {
                sails.log(err)
            } else {
                res.send(data);
            }
        })
    }
};

