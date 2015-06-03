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

    //select list vocabulary
	list: function(red,res) {
	  
      Vocabulary.selectByLevel({level: "N5"},function(err,vocabularies){
		if(err) return res.send(500);
		return res.render('vocabulary/list',{'vocabularies':vocabularies});   	
      });

	},

	//select flash card vocabulary
	flashcard: function(red,res) {
	  
      Vocabulary.selectByLevel({level: "N5"},function(err,vocabularies){
		if(err) return res.send(500);
		return res.render('vocabulary/flashcard',{'vocabularies':vocabularies});   	
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

  	//pronounce word
  	pronounce: function(req,res){
  		var vocabulary = req.allParams();
  		console.log(vocabulary);
  		VocabularyService.translate('ja',vocabulary.word,function(result){
			//console.log(result); 
		    if(result.success) {
		        res.json(result);
		    }
  		});
  	},
};

