/**
 * User.js
 *
 * @description :: info collection user
 * @docs        :: http://sailsjs.org/#!documentation/models
 * author: tuyentv1
 * email:tuyentv1@fsoft.com
 */

module.exports = {
    schema: true,
    attributes: {
        username: {
            type: 'string',
            required: true
        },
        firstname: {
            type: 'string',
            required: true
        },
        lastname: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            email: 'true',
            required: true,
            unique: true
        },
        encryptedPassword: {
            type: 'string'
        },
        address:{
            type:'string'
        }
    }
};

