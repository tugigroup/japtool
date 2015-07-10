/**
 * Created by DongDL1 on 7/7/2015.
 */

module.exports = {

  attributes: {
    userId: {
      type: 'string',
      required: true
    },

    groupId: {
      type: 'string'
    },

    bookID: {
      type: 'string',
      required: true
    },

    lesson:{
      type: 'string'
    },

    subLesson:{
      type: 'string'
    },

    mark:{
      type: 'float'
    },

    startDate:{
      type: 'datetime',
      required: true
    },

    finishDate:{
      type: 'datetime',
      required: true
    },
    bookUseHistory:{
      model:'BookUseHistory'
    },
    learning:{
      model:'Learning'
    }
  }
};
