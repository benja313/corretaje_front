var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var history = require('connect-history-api-fallback');

var port = process.env.PORT || 5000;

app = express();

app.use(history());
app.use(serveStatic(__dirname + "/dist"));


app.listen(port, function() {
  console.log('server started '+ port);
});