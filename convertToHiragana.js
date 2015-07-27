var querystring = require('querystring');
var request = require('request');
var async = require('async');
var fs = require('fs');
var parse = require('csv-parse');
var parser = parse({delimiter : ','});
var mongoose = require('mongoose');
var config = require('./config.json');

var collection = 'example';
var fromColl = 'example';
var toColl = 'reading';
var array = [];

data = fs.readFileSync('./convertToHiragana/data.csv',{"encoding":"utf8"});

//var array=["漢字が混ざっている文章(しんせつ)","日本","家のローンを３回払ったきりだ。会社を首になったので、これ以上払えない。","ひらがな化APIを利用すると、日本語文字列をひらがな、カタカナによる記載に変換するアプリケーションを作成できます。"]
parse(data, {delimiter : ',', comment: '#'}, function(err, arrays){
  arrays.forEach(function(item) {
     array.push(item[1]);
  });
  async.map(array, fetch, function(err, results){
    if (err) {
      console.log(err);
    }else {
      results.forEach(function(item) {
        console.log(item.converted);
      });
    }
  });
});

var fetch = function(sentence,callback){
  var post_data = querystring.stringify({
  app_id: "7d1769a7d48a6f631ecce039ddcbb57a9aa2bdeb221e7359fc4ce7daa73ee2a1",
  sentence: sentence,
  output_type: "hiragana"
  });

  request.post({
    uri:"https://labs.goo.ne.jp/api/hiragana",
    headers:{'content-type': 'application/x-www-form-urlencoded'},
    body:post_data
    },function(err,res,body){
      if (!err && res.statusCode == 200) {
        var json = JSON.parse(body);
        callback(null, json);
      }else {
        callback(error);
      }
  });
};