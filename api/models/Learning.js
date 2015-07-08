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
            type: 'datetime',
            required: true
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

        bookId: {
            type: 'string'
            //required: true
        },
        status: {
            type: 'String'
        }
    }
};