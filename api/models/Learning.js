/**
 * Learning.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        nameLearning: {
            type: 'string',
            required: true
        },

        imageLearning: {
            type: 'string'
        },

        description: {
            type: 'string'
        },

        startDate: {
            type: 'datetime'

        },

        finishDate: {
            type: 'datetime',
            required: true
        },

        maxMemberNum: {
            type: 'integer',
            defaultsTo: 1
        },

        memberSetId: {
            type: 'integer',
            defaultsTo: 1
        },
<<<<<<< HEAD

=======
>>>>>>> 1f8c4a68175c8e14a9a200cb5a63b870f5c67848
        bookMaster: {
            model: 'BookMaster'
        },

        bookUseHistories: {
            collection: 'BookUseHistory',
            via: 'learning'
        },

        UserLearnHistories: {
          collection: 'UserLearnHistory',
          via: 'learning'
        }
    }
};
