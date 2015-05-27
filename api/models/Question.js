/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        attributes: {
            content: {
                type: "string",
                required: true
            },
            answers: {
                collection: "answer",
                via: "question"
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
            tab: {
                type: "string"
            },
            category: {
                type: "string"
            },
            other: {
                type: "string"
            }
        }
    }
};

