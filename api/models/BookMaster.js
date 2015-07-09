/**
 * BookMaster.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: {type: 'string'},
        description: {type: 'string'},
        type: {type: 'string'},
        level: {type: 'string'},
        published: {type: 'boolean'},
        image: {type: 'string'},
        category: {type: 'string'},
        complex: {type: 'integer'},
        lessonNum: {type: 'integer'},
        hourForLearn: {type: 'integer'},
        usedNum: {type: 'integer'},
        recommendNum: {type: 'integer'},
        bookDetail: {
            collection: 'BookDetail',
            via: 'bookID'
        },
        learnings: {
            collection: 'Learning',
            via: 'bookId'
        },
        bookUseHistories: {
          collection: 'BookUseHistory',
          via: 'bookMaster'
        }
    }
};

