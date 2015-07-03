module.exports = {
    server: function () {
        return sails.config.connections.someMongodbServer.host;
    },

    port: function () {
        return sails.config.connections.someMongodbServer.port;
    },

    database: function () {
        return sails.config.connections.someMongodbServer.database;
    },

    skipperAdapter: function (collection) {
        return require('skipper-gridfs')({
            uri: 'mongodb://' + (this).server() + ':' + (this).port() + '/' + (this).database() + '.' + collection
        });
    }
}