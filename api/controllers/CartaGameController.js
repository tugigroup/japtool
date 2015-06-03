/**
 * CartaGameController
 *
 * @description :: Server-side logic for managing Cartagames
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	wordgen: function (req, res) {
    Vocabulary.find({level:'N5', tag:'lession1'},{word:1,meaning:1}).exec(function findCB(err, vols){
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
        reverseWords.push({'word':words[i].meaning,'meaning':words[i].word});
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

      return res.view('vocabulary/cartagame',{'ranWords':ranWords});
    });
  }
};

