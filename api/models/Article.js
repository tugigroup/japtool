/**
 * Created by DuongTD2 on 6/30/2015.
 */
module.exports = {

    attributes: {
        subject: {
            type: "string",
            required:true
        },

        content: {
            type: "string",
            required:true
        },
        questionSetID:{
            collection: 'Question',
            via: 'articleID'
        },
        explaination: {
            type: "string",
            required: true
        },

        translation: {
            type: "string",
            required: true
        },

        level: {
            type: "string",
            required: true
        },

        sort:{
            type: 'integer',
            autoIncrement: true
        },

        tag: {
            type: "string"
        },

        category: {
            type: "string",
            required: true
        },

        video: {
            type: "string"
        },

        image: {
            type: "string"
        },

        audio: {
            type: "string"
        }
    }
};