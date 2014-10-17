/**
 * Module dependencies.
 */

var express = require('express')
var routes = require('./routes')
var user = require('./routes/user')
var http = require('http')
var path = require('path');
var fs = require('fs');
var socketio = require('socket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
	fs.readFile('/view/index.ejs', 'utf8', function(error, data) {
	});
});

var io = socketio.listen(server)
//소켓들을 연결
io.sockets.on('connection', function(socket) {
	// message 이벤트
	socket.on('message', function(data) {
		io.sockets.emit('message', data);
		
	});
});
