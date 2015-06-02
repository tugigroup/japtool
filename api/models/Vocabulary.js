/**
* Vocabulary.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: { 
		word: {
		   type : 'string'
        },
		reading: {
		   type : 'string'
		},
　　　    type: {
			type : 'string'
        },		
		meaning: {
			type : 'string'
		},
        examples:　{
		    type : 'string' 
		},
		synonymous: {
		    type : 'string'
		},
		antonymous: {
			type : 'string'
		},
		other: {
			type : 'string'
		},
		image: {
			type : 'string'
		},
		audio: {
			type : 'string'
		},
		video: {
			type : 'string'
		},
		level: {
			type : 'string'
		},
		sort: {
			type : 'string'
		},
		tag: {
			type : 'string'
		},
		category: {
			type : 'string'
		}
  },
  
  //select vocabulary by Level
  selectByLevel: function(opts,cb) {
	var level = opts.level;
	
	 Vocabulary.find({level: level}).exec(function(err,vocabularies){
		if(err) return cb(err);
		return cb(null,vocabularies);
	 });
  }
  
};

