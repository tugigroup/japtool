var fs = require('fs');
var async = require('async');
var parse = require('csv-parse');
var parser = parse({delimiter : ','});

var mongoose = require('mongoose');
var config = require('./config.json');

var survey_array = [];
var surveyInsertCount = 0;

data = fs.readFileSync(config.survey_csv_file,{"encoding":"utf8"});
//console.log(data);

var surveySchema = new mongoose.Schema({
	sortIndex:  		Number,
	level: 				String,
	firstUsing:   		Boolean,
	uniqueUsing:   		Boolean,
	qType:   			{type: String, enum: ['1', '2']},
	question:   		String,
	option1:   			String,
	correct1:   		Boolean,
	option2:   			String,
	correct2:   		Boolean,
	option3:   			String,
	correct3:   		Boolean,
	option4:   			String,
	correct4:   		Boolean
	},{ collection: 'survey', versionKey: false });

var surveyColl = mongoose.model('survey', surveySchema);

var insertToSurvey = function(survey,callback){
	var firstUsing = (firstUsing === survey[2]),
	    uniqueUsing= (uniqueUsing === survey[3]),
	    correct1= (correct1 === survey[7]),
	    correct2= (correct2 === survey[9]),
	    correct3= (correct3 === survey[11]),
	    correct4= (correct4 === survey[13]);
    var insertedSurvey = new surveyColl({
		sortIndex:  		survey[0],
		level: 				survey[1],
		firstUsing:   		firstUsing,
		uniqueUsing:   		uniqueUsing,
		qType: 				survey[4],
		question:   		survey[5],
		option1:   			survey[6],
		correct1:   		correct1,
		option2:   			survey[8],
		correct2:   		correct2,
		option3:   			survey[10],
		correct3:   		correct3,
		option4:   			survey[12],
		correct4:   		correct4
	});

	insertedSurvey.save(function (err,data) {
		if(err) {
			callback(err);
		}else {
			surveyInsertCount ++;
			callback(null, surveyInsertCount);

		}
	});
};

parse(data, {delimiter : ',', comment: '#'}, function(err, surveys){

	if (err) {
		console.log('data import error! Data has wrong');
		return;
	}
	
	if (surveys.length == 0){
		console.log('Error! csv file has not any data');
		return;
	}

	// check header
	var header = surveys[0];
	if (header.length < 13 ||
		header[0] != 'sortIndex' ||
		header[1] != 'level' ||
		header[2] != 'firstUsing' ||
		header[3] != 'uniqueUsing' ||
		header[4] != 'qType' ||
		header[5] != 'question' ||
		header[6] != 'option1' ||
		header[7] != 'correct1' ||
		header[8] != 'option2' ||
		header[9] != 'correct2' ||
		header[10] != 'option3' ||
		header[11] != 'correct3' ||
		header[12] != 'option4' ||
		header[13] != 'correct4'
	){
		console.log('Error! Format of csv file is not correct.');
		return;
	}

	for (var i = 1; i < surveys.length; i++ ){
		survey_array.push(surveys[i]);
	}

	console.log('START: IMPORTING DATA...');
	console.log('========================');
	// connect to mongodb
	mongoose.connect('mongodb://' + config.dbhost + '/' + config.database);
	async.map(survey_array, insertToSurvey, function(err, results){
	    if (err) {
	       console.log(err);
	    }else {
	    	console.log('survey collection: ' + results.length + ' records was inserted.');
			console.log('========================');
			console.log('END: IMPORTED DATA');	
	    }
	    // disconect mongodb
	    mongoose.disconnect();
	});
});

