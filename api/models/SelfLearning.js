/**
 * Learning.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        notes: {
            type: 'string'
        },

        startDate: {
            type: 'datetime'

        },

        finishDate: {
            type: 'datetime',
            required: true
        },

        bookMaster: {
            model: 'BookMaster'
        },
        user: {
            model: 'User'
        },

        bookUseHistories: {
            collection: 'BookUseHistory',
            via: 'selfLearning'
        },

        userLearnHistories: {
          collection: 'UserLearnHistory',
          via: 'selfLearning'
        },
        getMissLesson: function (bookId,cb) {
          BookDetail.find({bookMaster:bookId}).exec(function(err,bookDetails){
            if (err) {
              sails.log("Err when read book detail data:");
              return res.serverError(err);
            }
            sails.log("Count Book Detail is: "  + bookDetails.length);
            return cb(bookDetails);
          });
        }
    }
};
