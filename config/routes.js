/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/index.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': 'japtool/HomeController.index',

    '/':'japtool/HomeController.index',
    'get/ new_group':'BuddyGroupController.create',
    /*Router by QuyetND2*/
    //'/':'admin/BookMasterController.index',
    '/createBookMaster':{view:'admin/article/book-master'},
    '/createBookDetail':'japtool/BookDetailController.getBookDetail',
    /*End QuyetND2*/


    // router by Duongtd2
    //article by duongtd2
    '/addArticle':{
        view:'admin/article/addArticle',
        locals: {
            layout: 'layout/layout-admin'
        }
    },
    'post /createArticle':'admin/Article.create',
    '/displayArticle':'admin/Article.showArticle',
    '/displayArticleCT/:id':'admin/Article.showArticle',
    '/showDeArticle':{
        view:'detailsArticle',
        locals: {
            layout: 'layout/layout-admin'
        }
    },
    '/showAudio/:fd':'admin/ArticleController.getAudio',
    '/showVideo/:fd':'admin/ArticleController.getVideo',
    '/showImage/:fd':'admin/ArticleController.getImg',
    '/showAllArticle':'admin/ArticleController.showAll',
    '/deleteArticle/:id':'admin/ArticleController.delete',
    'post /editArticle':'admin/ArticleController.editAr',
    '/sendEditArticle':'admin/ArticleController.editAr',
    'post /updateArticle':'admin/ArticleController.update',
    // Question by duongtd2
    '/addQuestion':{
        view:'admin/question/addQuestion',
        locals: {
            layout: 'layout/layout-admin'
        }
    },
    'post /createQuestion':'admin/Question.create',
    '/displayQuestion':'admin/Question.showQuestion',
    '/displayQuestionCT/:id':'admin/Question.showQuestion',
    '/showImageQue/:fd':'admin/Question.getImg',
    '/sendEditQuestion':'admin/Question.editQue',
    '/showAllQuestion':'admin/Question.showAll',
    'post /editQues':'admin/Question.editQue',
    '/deleteQuestion/:id':'admin/Question.delete',
    'post /updateQuestion':'admin/Question.update',
    '/pointToAddQue':'admin/Question.pointToAddQue',
    // End router by duongtd2
    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/


    'get /vocabulary': 'VocabularyController.index',
    'get /vocabulary/flashcard': 'VocabularyController.flashcard',
    'get /vocabulary/list': 'VocabularyController.list',
    'post /vocabulary/pronounce': 'VocabularyController.pronounce',
    'post /vocabulary/quicklearning': 'VocabularyController.quicklearning',

    'get /vocabulary/cartagame': 'CartaGameController.wordgen'
    /*Router by NamMh*/

};
