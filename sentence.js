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

exports.buildSentence = buildSentence;
