var fs = require('fs');
var parse = require('csv-parse');
var parser = parse({delimiter : ','});

var mongoose = require('mongoose');
var config = require('./config.json');

data = fs.readFileSync(config.book_csv_file,{"encoding":"utf8"});
//console.log(data);

parse(data, {delimiter : ',', comment: '#'}, function(err, lessons){

	// check header
	if (lessons.length == 0){
		console.log('Error! csv file has not any data.');
		return;
	}

	var header = lessons[0];
	if (header.length < 14 || 
		header[0] != 'name' ||
		header[1] != 'description' ||
		header[2] != 'type' ||
		header[3] != 'level' ||
		header[4] != 'lessonNum' ||
		header[5] != 'hoursForLearn' ||
		header[6] != 'usedNum' ||
		header[7] != 'recommendNum' ||
		header[8] != 'lesson' ||
		header[9] != 'subLesson' ||
		header[10] != 'sort' ||
		header[11] != 'useModule' ||
		header[12] != 'useCollection' ||
		header[13] != 'dataExtractCondition' ){

		console.log('Error! Format of csv file is not correct.');
		return;
	}

	// connect to mongodb
	mongoose.connect('mongodb://' + config.dbhost + '/' + config.database);

	var bookMasterSchema = mongoose.Schema({
	  name:  			String,
	  description: 		String,
	  type:   			String,
	  level:   			String,
	  lessonNum:   		Number,
	  hoursForLearn:   	Number,
	  usedNum: 			Number,
	  recommendNum:   	Number
	},{ collection: 'bookmaster', versionKey: false });

	var bookMasterColl = mongoose.model('bookmaster', bookMasterSchema);

	var bookDetailSchema = mongoose.Schema({
	  bookID:  			mongoose.Schema.Types.ObjectId,
	  lesson: 					String,
	  subLesson: 				String,
	  sort: 					Number,
	  useModule: 				String,
	  useCollection: 			String,
	  dataExtractCondition:   	String
	},{ collection: 'bookdetail', versionKey: false  });

	var bookDetailColl = mongoose.model('bookdetail', bookDetailSchema);

	var lesson;
	var bookMasterInsertCount = 0;
	var bookDetailInsertCount = 0;
	var errorCount = 0;
	var insertedBookMaster;
	var insertedBookDetail;
	console.log('START: IMPORTING DATA...');
	console.log('========================');
	for ( var i = 1; i < lessons.length; i++ ) {
		//console.log(lessions[i]);

		lesson = lessons[i];

		if (lesson[0] == "") {
			if (insertedBookMaster == null){
				errorCount++;
				continue; 

			} else{
				// insert book detail record
				insertedBookDetail = new bookDetailColl({
					bookID:  				insertedBookMaster._id,
				    lesson: 				lesson[8],
				    subLesson: 				lesson[9],
				    sort: 					lesson[10],
				    useModule: 				lesson[11],
				    useCollection: 			lesson[12],
				    dataExtractCondition: 	lesson[13]
				});

				insertedBookDetail.save(function (err,data) {
					if(err) {
					    console.log(err);
					    // disconect mongodb
						mongoose.disconnect();
					}else {
					    bookDetailInsertCount++;
					    if (bookDetailInsertCount == lessons.length -1) {
							console.log('bookMaser collection: ' + bookMasterInsertCount.toString() + ' records was inserted.');
							console.log('bookDetail collection: ' + bookDetailInsertCount.toString() + ' records was inserted.');
							console.log('Error records: ' + errorCount.toString() );

							// disconect mongodb
							mongoose.disconnect();
							console.log('========================');
							console.log('END: IMPORTED DATA');
						}
					}
				});
			}
		} else {
			// insert book master record
			insertedBookMaster = new bookMasterColl({
				name:  			lesson[0],
				description: 	lesson[1],
				type:   		lesson[2],
				level:   		lesson[3],
				lessonNum:   	lesson[4],
				hoursForLearn:  lesson[5],
				usedNum: 		lesson[6],
				recommendNum:   lesson[7]
			});

			insertedBookMaster.save(function (err,data) {
				if(err) {
					console.log(err);
					// disconect mongodb
					mongoose.disconnect();
				}else {
					bookMasterInsertCount++;
				}
			});

			// insert book detail record
			insertedBookDetail = new bookDetailColl({
				bookID:  				insertedBookMaster._id,
			    lesson: 				lesson[8],
			    subLesson: 				lesson[9],
			    sort: 					lesson[10],
			    useModule: 				lesson[11],
			    useCollection: 			lesson[12],
			    dataExtractCondition: 	lesson[13]
			});

			insertedBookDetail.save(function (err,data) {
				if(err) {
					console.log(err);
					// disconect mongodb
					mongoose.disconnect();
				}else {
					bookDetailInsertCount++;
					if (bookDetailInsertCount == lessons.length -1) {
						console.log('bookMaser collection: ' + bookMasterInsertCount.toString() + ' records was inserted.');
						console.log('bookDetail collection: ' + bookDetailInsertCount.toString() + ' records was inserted.');
						console.log('Error records: ' + errorCount.toString() );

						// disconect mongodb
						mongoose.disconnect();
						console.log('========================');
						console.log('END: IMPORTED DATA');
					}
				}
			});
		}
	};
});
