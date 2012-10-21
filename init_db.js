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
  {presente: "depaupera"},
  {presente: "dileggia"},
  {presente: "esperisce"},
  {presente: "ottempera a"},
  {presente: "procrastina"},
  {presente: "vitupera"},
  {presente: "esautora"},
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


for (var i = 0; i < nouns.length; i++) {
  db.nouns.save(nouns[i]);
}
for (var i = 0; i < verbs.length; i++) {
  db.verbs.save(verbs[i]);
}
for (var i = 0; i < adjectives.length; i++) {
  db.adjectives.save(adjectives[i]);
}
