
/**
 * Module dependencies.
 */

var express = require('express')
  , load = require('express-load')// vai gerenciar 
  , http = require('http')
  , path = require('path');
var app = express();
var mongoose = require("mongoose");
var db = mongoose.connect;
const serverFavicon = require("serve-favicon");
const serverStatic = require("serve-static");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const logger = require("morgan");
const errorHandler = require("errorhandler");

mongoose.connect('mongodb://flavianeribeiro:melancia022@ds123834.mlab.com:23834/produtospdc', function(err){
  if(err){
    console.log('Erro ao concetar ao mongodb'+err);
  }else{
    console.log('concetado ao Banco ...')
  }
});

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(serverFavicon(path.join(__dirname, 'public/favicon.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
//app.use(app.router);
app.use(serverStatic(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// carregar os models onde estará os projetos
load('models').then('controllers').then('routes').into(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
