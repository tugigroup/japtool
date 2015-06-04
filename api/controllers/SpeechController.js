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

      Vocabulary.find().exec(function findCB(err,vocabularies){
   
        res.render('vocabadmin/index',{'vocabularies':vocabularies});   
      });

  },


};

