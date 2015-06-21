var http = require('http');
var net = require('net');
//Lets define a port we want to listen to
const PORT=80; 
var dvrurl='182.191.87.200';
var dvrport=37777;
var connect_status = 'false';
var client = new net.Socket();
//We need a function which handles requests and send response
client.connect(dvrport, dvrurl, function() {
    console.log('CONNECTED TO: ' + dvrurl + ':' + dvrport);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    //client.write('I am Chuck Norris!');
	connect_status='true';
	client.destroy();
	console.log('Disconnected from DVR');
	});
	
function handleRequest(request, response){
	
	console.log('Http connection');	
    response.end('It Works!! Path Hit: ' + request.url + ' '+ 'DVR Connection test: '+connect_status);
}

client.on('close', function() {
    console.log('Connection closed to DVR');
});

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("I am doing my 5 minutes check");
  client.connect(dvrport, dvrurl, function() {
    console.log('CONNECTED TO: ' + dvrurl + ':' + dvrport);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    //client.write('I am Chuck Norris!');
	connect_status='true';
	client.destroy();
	console.log('Disconnected from DVR');
	});
}, the_interval);
