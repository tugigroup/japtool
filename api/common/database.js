module.exports = {
	host: function () {
        return sails.config.connections.someMongodbServer.host;
    },

    port: function () {
        return sails.config.connections.someMongodbServer.port;
    },

    name: function () {
        return sails.config.connections.someMongodbServer.database;
    },

    uri: function () {
    	return 'mongodb://' + 
    			sails.config.connections.someMongodbServer.host + ':' +
    			sails.config.connections.someMongodbServer.port + '/' +
    			sails.config.connections.someMongodbServer.database;
    },

    skipperAdapter: function (collection) {
        return require('skipper-gridfs')({
            uri: 'mongodb://' + 
    			sails.config.connections.someMongodbServer.host + ':' +
    			sails.config.connections.someMongodbServer.port + '/' +
    			sails.config.connections.someMongodbServer.database + '.' +
    			collection
        });
    },
    
}