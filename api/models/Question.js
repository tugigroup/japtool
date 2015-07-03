/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        articleID:{
            model:'Article',
            required:true
        },
        sort:{
            type:'integer'
        },
        question:{
            type:'string',
            required:true
        },
        image:{
            type:'string'
        },
        option1:{
            type:'string',
            required:true
        },
        resultOption1:{
            type:'boolean',
            required:true
        },
        option2:{
            type:'string',
            required:true
        },
        resultOption2:{
            type:'boolean',
            required:true
        },
        option3:{
            type:'string',
            required:true
        },
        resultOption3:{
            type:'boolean',
            required:true
        },
        option4:{
            type:'string',
            required:true
        },
        resultOption4:{
            type:'boolean',
            required:true
        }
    }
};

