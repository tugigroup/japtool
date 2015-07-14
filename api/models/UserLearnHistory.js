/**
 * Created by DongDL1 on 7/7/2015.
 */

module.exports = {

  attributes: {
    user: {
      model: 'User'
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
    selfLearning:{
      model:'SelfLearning'
    }
  }
};
