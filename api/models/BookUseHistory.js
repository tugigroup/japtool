/**
 * Created by DongDL1 on 7/8/2015.
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

    finishRate:{
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
    bookMaster:{
      model:'BookMaster'
    },
    userLearnHistories: {
      collection: 'UserLearnHistory',
      via: 'bookUseHistory'
    }
  }
};
