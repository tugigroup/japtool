var mongoose = require('mongoose');
var config = require('./config.json');

// connect to mongodb
mongoose.connect('mongodb://' + config.dbhost + '/' + config.database);

// vocabulary collection
var vocabularySchema = mongoose.Schema({
	},{ collection: 'vocabulary', versionKey: false });

var Vocabulary = mongoose.model('vocabulary', vocabularySchema);

Vocabulary.remove({}, function (err) {
  if (err) return err;
});
console.log('Vocabulary was removed all documents.');

// example collection
var exampleSchema = mongoose.Schema({
	},{ collection: 'example', versionKey: false });

var example = mongoose.model('example', exampleSchema);

example.remove({}, function (err) {
  if (err) return err;
});
console.log('example was removed all documents.');

// kanji collection
var kanjiSchema = mongoose.Schema({
	},{ collection: 'kanji', versionKey: false });

var kanji = mongoose.model('kanji', kanjiSchema);

kanji.remove({}, function (err) {
  if (err) return err;
});
console.log('kanji was removed all documents.');

// disconect mongodb
mongoose.disconnect();