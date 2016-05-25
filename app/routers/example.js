var express = require('express'),
    router = express.Router();

module.exports = function(app) {
    app.use('/example', router);

    router.get('/get', function(req, res) {
        res.send('Hello World!');
    });

};
