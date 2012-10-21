var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var http = require('http');
var static = require('node-static');
var url = require('url');
var util = require('util');
var sentence = require('./sentence');
var mongodb_conn = require('./mongodb-connector');
var mongodb = require('mongodb');

var file = new(static.Server)('public', {
  cache: 3600,
  headers: { 'X-Powered-By': 'node-static'}
});


function route(handle, pathname, req, res) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](req, res);
  } else {
    serveFile(req, res);
  }
};

function serveFile(req, res) {
  req.addListener('end', function() {
    file.serve(req, res, function(err, result) {
      if (err) {
        console.error('Error serving %s - %s', req.url, err.message);
        if (err.status === 404 || err.status === 500) {
          file.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
        } else {
          res.writeHead(err.status, err.headers);
          res.end();
        }
      }
    });
  });
};

var events = require('events');
var SentenceParts = function() {
  this.partCount = 0;
  this.subject = undefined;
  this.verb = undefined;
  this.obj = undefined;
  this.adjective1 = undefined;
  this.adjective2 = undefined;
}

SentenceParts.prototype = new events.EventEmitter;

SentenceParts.prototype.receivePart = function(part, value) {
  this[part] = value;
  this.partCount++;

  if (this.partCount== 5) {
    this.emit('all-parts-received');
  }
}

function pickRandomFrom(collectionName, callback) {
  mongodb.connect(mongodb_conn.mongourl, function(err, conn) {
    conn.collection(collectionName, function(err, coll) {
      coll.find().count(function(e, count) {
        var skip = Math.floor(Math.random()*(count - 1));
        var item = coll.find().limit(-1).skip(skip).nextObject(function(err, item) {
          callback(item);
        });
      });
    });
  });
}

function generateSentence(req, res) {
  var sentenceParts = new SentenceParts();
  sentenceParts.on('all-parts-received', function() {
    res.write(sentence.buildSentence(sentenceParts));
    res.end();
  });

  pickRandomFrom('nouns', function(item) {
    sentenceParts.receivePart('subject', item);
  });
  pickRandomFrom('verbs', function(item) {
    sentenceParts.receivePart('verb', item);
  });
  pickRandomFrom('nouns', function(item) {
    sentenceParts.receivePart('obj', item);
  });
  pickRandomFrom('adjectives', function(item) {
    sentenceParts.receivePart('adjective1', item);
  });
  pickRandomFrom('adjectives', function(item) {
    sentenceParts.receivePart('adjective2', item);
  });
};

var handle = {}
handle["/generate-sentence"] = generateSentence;

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  route(handle, pathname, req, res);
}).listen(port, host);
