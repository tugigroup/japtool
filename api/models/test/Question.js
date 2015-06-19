/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        content: {
            type: "string",
            required: true
        },
        answers: {
            collection: "answer",
            via: "idQuestion"
        },
        image: {
            type: "string"
        },
        audio: {
            type: "string"
        },
        video: {
            type: "string"
        },
        level: {
            type: "string"
        },
        sort: {
            type: "integer"
        },
        tag: {
            type: "string"
        },
        category: {
            type: "string"
        },
        lesson: {
            type: "string"
        },
        other: {
            type: "string"
        },
        bookDetail:{
            model:'BookDetail'
        }
    }
};

