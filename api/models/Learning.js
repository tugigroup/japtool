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
            via: 'learning'
        },

        UserLearnHistories: {
          collection: 'UserLearnHistory',
          via: 'learning'
        }
    }
};
