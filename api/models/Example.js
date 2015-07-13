/**
 * Vocabulary.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        exampleSetID: {
            model: 'vocabulary'
        },
        exampleSetKanjiID: {
            model: 'kanji'
        },
        example: {
            type: 'string'
        },
        meaning: {
            type: 'string'
        },
        grammar: {
          model: 'Grammar'
        },
    }

};

