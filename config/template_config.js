var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var domain = 'http://localhost';
var port = 3000;
var uri = domain + ':' + port;

var config = {
    root: rootPath,
    port: port,
    domain: domain,
    uri: uri,
    logger: {
        console: <logger.console>,
        file: <logger.file>
    },
    oauth: {
        client_id: <oauth.client_id>,
        client_secret: <oauth.client_secret>,
        callback: uri + '/user/google_callback'
    },
    mysql: {
        database: 'kdrpoints',
        user: <mysql.user>,
        pass: <mysql.pass>
    },
    session: {
        secret: <session.secret>
    }
};

module.exports = config;
