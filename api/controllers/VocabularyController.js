/**
 * VocabularyController
 *
 * @description :: Server-side logic for managing vocabularies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//index page
	index: function(red,res) {
		return res.view('vocabulary/index');   	
	},

    //select vocabulary for [list] style
	list: function(red,res) {
      var extractDataCondition = '{"level": "N5", "tag" : {"contains":",lession1,"}}';
	  Vocabulary.selectByLevel({condition: extractDataCondition},function(err,vocabularies){
		if(err) return res.send(err.status);
		return res.render('vocabulary/list',{'vocabularies':vocabularies});   	
      });

	},

	//select vocabulary for [flash card] style
	flashcard: function(red,res) {
	  var extractDataCondition = '{"level": "N5", "tag" : {"contains":",lession1,"}}';
	  Vocabulary.selectByLevel({condition: extractDataCondition},function(err,vocabularies){
		if(err) return res.send(err.status);
		return res.render('vocabulary/flashcard',{'vocabularies':vocabularies});   	
      });

	},

	//select vocabulary for [quick learning] style
	quicklearning: function(req,res){
	   var extractDataCondition = '{"level": "N5", "tag" : {"contains":",lession1,"}}';
	   Vocabulary.selectByLevel({condition: extractDataCondition},function(err,vocabularies){
		if(err) return res.send(err.status);
		return res.render('vocabulary/quicklearning',{'vocabularies':vocabularies});   	
      });
	},
	
	/*vocabulary: function(req,res) {
		var gfs = req.gfs;
		// body...
		var dbAdapter = require('skipper-gridfs')({uri:'mongodb://taitt:taitt@52.68.197.24:27017/taitt.file'});
		dbAdapter.read("7c6d1738-03da-40e8-bd58-c3e3c04a9ba2.jpg", function(err,results){
			res.type('image/png');
        	res.send(new Buffer(results));
		});
	},
	*/

  	//pronounce word by google translate
  	pronounce: function(req,res){
  		var vocabulary = req.allParams();
  		console.log(vocabulary);
  		VocabularyService.googleTranslate('ja',vocabulary.word,function(result){
			//console.log(result); 
		    if(result.success) {
		        res.json(result);
		    }
  		});
  	},

  	// //pronounce word by voicerRss
  	// pronounce: function(req,res){
  	// 	var vocabulary = req.allParams();
  	// 	console.log(vocabulary);
  	// 	VocabularyService.voicerRSS('ja-jp',vocabulary.word,function(result){
			// //console.log(result); 
		 //    if(result.success) {
		 //        res.json(result);
		 //    }
  	// 	});
  	// },
};

