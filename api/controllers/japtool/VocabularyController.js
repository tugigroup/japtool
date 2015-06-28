/**
 * VocabularyController
 *
 * @description :: Server-side logic for managing vocabularies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//index page
	index: function(red,res) {
		return res.view('japtool/vocabulary/index');   	
	},

    //select vocabulary for [list] style
	list: function(red,res) {
      var extractDataCondition = '{"level": "N2", "tag" : {"contains":",trainghia3,lession4,"}}';
	  Vocabulary.selectByLevel({condition: extractDataCondition},function(err,vocabularies){
		if(err) return res.send(err.status);
		return res.render('japtool/vocabulary/list',{'vocabularies':vocabularies});   	
      });

	},

	//select vocabulary for [flash card] style
	flashcard: function(red,res) {
	  var extractDataCondition = '{"level": "N2", "tag" : {"contains":",trainghia3,lession4,"}}';
	  Vocabulary.selectByLevel({condition: extractDataCondition},function(err,vocabularies){
		if(err) return res.send(err.status);
		return res.render('japtool/vocabulary/flashcard',{'vocabularies':vocabularies});   	
      });

	},

	//select vocabulary for [quick learning] style
	quicklearning: function(req,res){
	   var extractDataCondition = '{"level": "N2", "tag" : {"contains":",trainghia3,lession4,"}}';
	   Vocabulary.selectByLevel({condition: extractDataCondition},function(err,vocabularies){
		if(err) return res.send(err.status);
		return res.render('japtool/vocabulary/quicklearning',{'vocabularies':vocabularies});   	
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

  	cartagame: function (req, res) {

  		//var extractDataCondition = '{"level": "N2", "tag" : {"contains":",trainghia3,lession4,"}}';
	    //Vocabulary.selectByLevel({condition: extractDataCondition},function(err,vocabularies){

  	    Vocabulary.find({level:'N2', tag: {"contains":",trainghia3,lession4,"}},{item:1,description:1}).exec(function(err, vols){
	      if(err) return res.send(500);

	      //Random Get max 12 words in collection
	      var tmpWords = vols.slice(0);
	      var words = [];
	      var index;
	      while (words.length < 12 && tmpWords.length > 0) {
	        index = Math.floor(Math.random() * tmpWords.length);
	        words.push(tmpWords[index]);
	        tmpWords.splice(index,1);
	      }

	      var reverseWords = [];
	      for(i = 0; i < words.length; i++) {
	        reverseWords.push({'item':words[i].description,'description':words[i].item});
	      }

	      var concatWords = [];
	      for (i = 0; i < words.length; i++)
	      {
	        concatWords.push(words[i]);
	        concatWords.push(reverseWords[i]);
	      } 

	      var ranWords = [];
	      while (concatWords.length > 0) {
	        index = Math.floor(Math.random() * concatWords.length);
	        ranWords.push(concatWords[index]);
	        concatWords.splice(index,1);
	      }

	      console.log("Data (words): " + JSON.stringify(words));
	      console.log("-----------------------");
	      console.log("Data (reverse): " + JSON.stringify(reverseWords));
	      console.log("-----------------------");
	      console.log("Data (concat): " + JSON.stringify(concatWords));
	      console.log("-----------------------");
	      console.log("Data (random): " + JSON.stringify(ranWords));

	      return res.render('japtool/vocabulary/cartagame',{'ranWords':ranWords});
	    });
	  },
};

