var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var http = require('http');
var static = require('node-static');
var url = require('url');
var util = require('util');

var file = new(static.Server)('public', {
  cache: 3600,
  headers: { 'X-Powered-By': 'node-static'}
});


function route(handle, pathname, req, res) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](req, res);
  } else {
    handle['static-file'](req, res);
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


var nouns = [
{nome:"astante", genere:"M"},
{nome:"busillis", genere:"M"},
{nome:"caratura", genere:"F"},
{nome:"crepuscolo", genere:"M"},
{nome:"dileggiatore", genere:"M"},
{nome:"discente", genere:"M"},
{nome:"discrasia", genere:"F"},
{nome:"epigono", genere:"M"},
{nome:"fattispecie", genere:"F"},
{nome:"ignominia", genere:"F"},
{nome:"illazione", genere:"F"},
{nome:"improperio", genere:"M"},
{nome:"latore", genere:"M"},
{nome:"pleonasmo", genere:"M"},
{nome:"ritrosia", genere:"F"},
{nome:"sinossi", genere:"F"},
{nome:"vanesio", genere:"M"},
{nome:"vituperio", genere:"M"},
  ];

var verbs = [
"depaupera",
  "dileggia",
  "esperisce",
  "ottempera a",
  "procrastina",
  "vitupera",
  "esautora",
  ];

var adjectives = [
{M:"desueto", F:"desueta"},
{M:"esacerbato", F:"esacerbata"},
{M:"micragnoso", F:"micragnosa"},
{M:"pleonastico", F:"pleonastica"},
{M:"protervo", F:"proterva"},
{M:"querulo", F:"querula"},
{M:"sesquipedale", F:"sesquipedale"},
{M:"taumaturgico", F:"taumaturgica"},
{M:"turpe", F:"turpe"},
{M:"vanesio", F:"vanesia"},
  ];


function generateSentence(req, res) {
  res.write(buildSentence());
  res.end();
}

function buildSentence() {
  var subject = pickRandom(nouns);
  var verb = pickRandom(verbs);
  var obj = pickRandom(nouns);
  var adjective1 = pickRandom(adjectives);
  var adjective2 = pickRandom(adjectives);
  var body = selectArticoloDet(adjective1[subject.genere], subject.genere) + " " + adjective1[subject.genere] + " " + subject.nome + " " + verb + " " + selectArticoloInd(adjective2[obj.genere], obj.genere) + " " + adjective2[obj.genere] + " " + obj.nome;
  body = body.charAt(0).toUpperCase() + body.slice(1) + ".";
  return body;
};

function selectArticoloDet(parola, genere) {
  if (startsWithVowel(parola)) {
    return "l'";
  } else if (genere == "M") {
    return "il";
  } else {
    return "la";
  }
};

function selectArticoloInd(parola, genere) {
  if (startsWithVowel(parola)) {
    if (genere == "M") {
      return "un";
    } else {
      return "un'";
    }

  } else if (genere == "M") {
    return "un";
  } else {
    return "una";
  }
};

function startsWithVowel(word) {
  var initial = ['a', 'e', 'i', 'o', 'u'].indexOf(word.charAt(0));
  return initial > -1;
};

function pickRandom(list) {
  return list[Math.floor(Math.random()*list.length)];
};

var handle = {}
handle["static-file"] = serveFile;
handle["/generate-sentence"] = generateSentence;

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  route(handle, pathname, req, res);
}).listen(port, host);

