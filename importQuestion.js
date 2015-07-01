var fs = require('fs');
var parse = require('csv-parse');
var parser = parse({delimiter : ','});

var mongoose = require('mongoose');
var config = require('./config.json');

data = fs.readFileSync(config.article_csv_file,{"encoding":"utf8"});
//console.log(data);

parse(data, {delimiter : ',', comment: '#'}, function(err, articles){

	// check header
	if (articles.length == 0){
		console.log('Error! csv file has not any data.');
	}

	var header = articles[0];
	if (header.length < 13 || 
		header[0] != 'subject' ||
		header[1] != 'content' ||
		header[2] != 'level' ||
		header[3] != 'sort' ||
		header[4] != 'tag' ||
		header[5] != 'category' ||
		header[6] != 'sort' ||
		header[7] != 'question' ||
		header[8] != 'option1' ||
		header[9] != 'option2' ||
		header[10] != 'option3' ||
		header[11] != 'option4' ||
		header[12] != 'result' ){

		console.log('Error! Format of csv file is not correct.');
	}

	// connect to mongodb
	mongoose.connect('mongodb://' + config.dbhost + '/' + config.database);

	var articleSchema = mongoose.Schema({
	  subject:  String,
	  content:  String,
	  level:    String,
	  sort:     Number,
	  tag:      String,
	  category: String
	},{ collection: 'article', versionKey: false });

	var articleColl = mongoose.model('article', articleSchema);

	var questionSchema = mongoose.Schema({
	  articleID:     mongoose.Schema.Types.ObjectId,
	  sort:          Number,
	  question:      String,
	  option1:       String,
	  resultOption1: Boolean,
	  option2:       String,
	  resultOption2: Boolean,
	  option3:       String,
	  resultOption3: Boolean,
	  option4:       String,
	  resultOption4: Boolean
	},{ collection: 'question', versionKey: false  });

	var questionColl = mongoose.model('question', questionSchema);

	var article;
	var result1;
	var result2;
	var result3;
	var result4;
	var articleInsertCount = 0;
	var questionInsertCount = 0;
	var errorCount = 0;
	var insertedArticle;
	var insertedQuestion;

	for ( var i = 1; i < articles.length; i++ ) {
		//console.log(lessions[i]);

		article = articles[i];

		if (article[0] == "") {
			if(article[1] == ""){
				if (insertedArticle == null){
				errorCount++;
				continue; 

				} else {
					// insert question record
				    switch(article[12].toUpperCase()) {
				    	case "A" :
				    		result1 = true;
				    		result2 = false;
				    		result3 = false;
				    		result4 = false;
				    		break;
				    	case "B" :
				    		result1 = false;
				    		result2 = true;
				    		result3 = false;
				    		result4 = false;
				    		break;
				    	case "C" :
				    		result1 = false;
				    		result2 = false;
				    		result3 = true;
				    		result4 = false;
				    		break;
				    	case "D" :
				    		result1 = false;
				    		result2 = false;
				    		result3 = false;
				    		result4 = true;
				    		break;
				    }
					insertedQuestion = new questionColl({
						articleID:  			insertedArticle._id,
					    sort: 				    article[6],
					    question: 			    article[7],
					    option1: 				article[8],
					    resultOption1: 			result1,
					    option2: 	            article[9],
					    resultOption2: 			result2,
					    option3: 	            article[10],
					    resultOption3: 			result3,
					    option4: 	            article[11],
					    resultOption4: 			result4
					});

					insertedQuestion.save();
					questionInsertCount++;
				}
			}else {
				// insert article record
				insertedArticle = new articleColl({
					subject:  			article[0],
					content: 			article[1],
					level:   			article[2],
					sort:   			article[3],
					tag:   				article[4],
					category:  			article[5]
				});

				insertedArticle.save();
				articleInsertCount++;
				// insert question record
				switch(article[12].toUpperCase()) {
				    case "A" :
				    	result1 = true;
				    	result2 = false;
				    	result3 = false;
				    	result4 = false;
				    	break;
				    case "B" :
				    	result1 = false;
				    	result2 = true;
				    	result3 = false;
				    	result4 = false;
				    	break;
				    case "C" :
				    	result1 = false;
				    	result2 = false;
				    	result3 = true;
				    	result4 = false;
				    	break;
				    case "D" :
				    	result1 = false;
				    	result2 = false;
				    	result3 = false;
				    	result4 = true;
				    	break;
				}
				insertedQuestion = new questionColl({
					articleID:  			insertedArticle._id,
					sort: 				    article[6],
					question: 			    article[7],
					option1: 				article[8],
					resultOption1: 			result1,
					option2: 	            article[9],
					resultOption2: 			result2,
					option3: 	            article[10],
					resultOption3: 			result3,
					option4: 	            article[11],
					resultOption4: 			result4
				});

				insertedQuestion.save();
				questionInsertCount++;
			}
		} else {
			// insert article record
			insertedArticle = new articleColl({
				subject:  			article[0],
				content: 			article[1],
				level:   			article[2],
				sort:   			article[3],
				tag:   				article[4],
				category:  			article[5]
			});

			insertedArticle.save();
			articleInsertCount++;

    		switch(article[12].toUpperCase()) {
			    case "A" :
			    	result1 = true;
			    	result2 = false;
			    	result3 = false;
			    	result4 = false;
			    	break;
			    case "B" :
			    	result1 = false;
			    	result2 = true;
			    	result3 = false;
			    	result4 = false;
			    	break;
			    case "C" :
			    	result1 = false;
			    	result2 = false;
			    	result3 = true;
			    	result4 = false;
			    	break;
			    case "D" :
			    	result1 = false;
			    	result2 = false;
			    	result3 = false;
			    	result4 = true;
			    	break;
			}
			// insert question record
			insertedQuestion = new questionColl({
				articleID:  			insertedArticle._id,
				sort: 				    article[6],
				question: 			    article[7],
				option1: 				article[8],
				resultOption1: 			result1,
				option2: 	            article[9],
				resultOption2: 			result2,
				option3: 	            article[10],
				resultOption3: 			result3,
				option4: 	            article[11],
				resultOption4: 			result4
			});

			insertedQuestion.save();
			questionInsertCount++;
		}
	};

	console.log('article collection: ' + articleInsertCount.toString() + ' records was inserted.');
	console.log('question collection: ' + questionInsertCount.toString() + ' records was inserted.');
	console.log('Error records: ' + errorCount.toString() );

	// disconect mongodb
	mongoose.disconnect();
});
