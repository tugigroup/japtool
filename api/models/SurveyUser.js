/**
 * Vocabulary.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        surveyID:{
            type: 'Integer'
        },
        correct1: {
            type:"Boolean"
        },
        correct2: {
            type:"Boolean"
        },
        correct3: {
            type:"Boolean"
        },
        correct4: {
            type:"Boolean"
        }

    }

};

