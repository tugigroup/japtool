module.exports = {
    server: function () {
        return 'localhost';
    },

    port: function () {
        return '27017';
    },

    database: function () {
        return 'japtool';
    },

    skipperAdapter: function (collection) {
        return require('skipper-gridfs')({
            uri: 'mongodb://' + (this).server() + ':' + (this).port() + '/' + (this).database() + '.' + collection
        });
    }
}