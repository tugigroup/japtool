/**
 * SpeechController
 *
 * @description :: Server-side logic for managing speeches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
   /**
   * `VocabAdminController.index()`
   */
  index: function (req, res) {

      Vocabulary.find().exec(function findCB(err,sentences){
   
        res.render('speech/index',{'sentences':sentences});   
      });

  },


};

