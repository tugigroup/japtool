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
    },
    beforeCreate: function(values,next){
        //This checks to make sure the password confirmation match before creating record
        if(!values.password || values.password != values.confirmation){
            return next({err: ["Password doesn't match password confirmation."]});
        }
        require('bcrypt').hash(values.password,10,function passwordEncypted(err,encryptedPassword){
            if(err){
                return next(err);
            }
            values.encryptedPassword = encryptedPassword;
            //values.online = true;
            next();
        });
    }
};

