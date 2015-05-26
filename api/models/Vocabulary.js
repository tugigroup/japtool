/**
* Vocabulary.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        no: {
			type: 'integer',
			autoIncrement: true
		},
        _id: {
		   type : 'string'
		}, 
		work_code: {
		   type : 'string'
        },
		word: {
		   type : 'string'
		},
　　　    read: {
			type : 'string'
        },		
		meaning: {
			type : 'string'
		},
        example:　{
		    type : 'string' 
		},
		image: {
		    type : 'string'
		},
		other: {
			type : 'string'
		}
  },
  
  //select vocabulary by course
  selectByCourse: function(opts,cb) {
	var tag = opts.work_code;
	
	 Vocabulary.find({work_code: tag}).exec(function(err,vocabularies){
		if(err) return cb(err);
		return cb(null,vocabularies);
	 });
  }
  
};

