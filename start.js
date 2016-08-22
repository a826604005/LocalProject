var express = require('express'),

app = express();
app.use(express.static(__dirname));
console.log(__dirname);

var server = app.listen(8083, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
