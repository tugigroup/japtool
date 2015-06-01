/**
 * BuddyGroup.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        groupName: {
            type: 'string'
        },
        groupDesc: {
            type: 'string'
        },
        // Add a reference to User
        users: {
            collection: "user",
            via: "buddyGroup"
        }
    }
};

