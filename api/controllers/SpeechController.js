/**
 * SpeechController
 *
 * @description :: Server-side logic for managing speeches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
   /**
   * `SpeechController.index()`
   */
  index: function (req, res) {

  	res.redirect('speech/index'); 

  },

  /**
   * `SpeechController.speak()`
   */
  speak: function (req, res) {

      Vocabulary.find({level:'N5'},{word:1,example:1}).exec(function findCB(err,sentences){
   
   		console.log('Found word for speech practise ' + JSON.stringify(sentences));

        res.render('speech/speak',{'sentences':sentences});   
      });

  },


};

