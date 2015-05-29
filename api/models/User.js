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
        admin: {
            type: 'boolean',
            defaultsTo: false
        },
        address: {
            type: 'string'
        },
        gender: {
            type: 'integer'
        },
        birthday: {
            type: 'date'
        },
        website: {
            type: 'string'
        },
        avatar: {
            type: 'string'
        },
        status: {
            type: 'boolean',
            defaultsTo: true
        },
        lastLogin: {
            type: 'date'
        },
        creatingDate: {
            type: 'date'
        },
        online: {
            type: 'boolean',
            defaultsTo: false
        },
        // Add a reference to User
        buddyGroup: {
            collection: "buddyGroup",
            via: "users"
        }


    },
    beforeCreate: function (values, next) {
        //This checks to make sure the password confirmation match before creating record
        if (!values.password || values.password != values.confirmation) {
            return next({err: ["Password doesn't match password confirmation."]});
        }
        require('bcryptjs').hash(values.password, 10, function passwordEncypted(err, encryptedPassword) {
            if (err) {
                return next(err);
            }
            values.encryptedPassword = encryptedPassword;
            //values.online = true;
            next();
        });

    }
};

