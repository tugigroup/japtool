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
    var insertedSurvey = new surveyColl({
		sortIndex:  		survey[0],
		level: 				survey[1],
		firstUsing:   		survey[2],
		uniqueUsing:   		survey[3],
		question:   		survey[4],
		option1:   			survey[5],
		correct1:   		survey[6],
		option2:   			survey[7],
		correct2:   		survey[8],
		option3:   			survey[9],
		correct3:   		survey[10],
		option4:   			survey[11],
		correct4:   		survey[12]
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
		header[4] != 'question' ||
		header[5] != 'option1' ||
		header[6] != 'correct1' ||
		header[7] != 'option2' ||
		header[8] != 'correct2' ||
		header[9] != 'option3' ||
		header[10] != 'correct3' ||
		header[11] != 'option4' ||
		header[12] != 'correct4'
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

