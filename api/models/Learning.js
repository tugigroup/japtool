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


        status: {
            type: 'String'
        },
        bookId: {
            model: 'BookMaster'
        },
        BookUseHistories: {
            collection: 'BookUseHistory',
            via: 'learning'
        }
    }
};