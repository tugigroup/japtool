/**
 * VocabularyController
 *
 * @description :: Server-side logic for managing vocabularies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//select vacabulary
	index: function(red,res) {
	  //var id=req.param("id",null);
	  
      Vocabulary.selectByCourse({work_code: "N5001"},function(err,vocabularies){
        //res.view(vocabularies);
		if(err) return res.send(500);
		return res.view('vocabulary/index',{'vocabularies':vocabularies});   	
      });
	},

    //select vacabulary
	list: function(red,res) {
	  //var id=req.param("id",null);
	  
      Vocabulary.selectByCourse({work_code: "N5001"},function(err,vocabularies){
        //res.view(vocabularies);
		if(err) return res.send(500);
		return res.view('vocabulary/list',{'vocabularies':vocabularies});   	
      });
	},

	//select vacabulary
	flashcard: function(red,res) {
	  //var id=req.param("id",null);
	  
      Vocabulary.selectByCourse({work_code: "N5001"},function(err,vocabularies){
        //res.view(vocabularies);
		if(err) return res.send(500);
		return res.view('vocabulary/flashcard',{'vocabularies':vocabularies});   	
      });
	},
	vocabulary: function(req,res) {
		var gfs = req.gfs;
		// body...
		var dbAdapter = require('skipper-gridfs')({uri:'mongodb://taitt:taitt@52.68.197.24:27017/taitt.file'});
		dbAdapter.read("7c6d1738-03da-40e8-bd58-c3e3c04a9ba2.jpg", function(err,results){
			res.type('image/png');
            res.send(new Buffer(results));
            //res.view({image:results});
		});
	}
};

