var nouns = [
  {italiano:
    {nome:"spettatore", genere:"M"},
   albertese:
    {nome:"astante", genere:"M"}
  },
  {italiano:
    {nome:"problema", genere:"M"},
   albertese:
    {nome:"busillis", genere:"M"}
  },
  {italiano: 
    {nome:"valore", genere:"M"},
  albertese:
    {nome:"caratura", genere:"F"}
  },
  {italiano:
    {nome:"tramonto", genere:"M"},
   albertese:
    {nome:"crepuscolo", genere:"M"}
  },
  {italiano:
    {nome:"derisore", genere:"M"},
   albertese:
    {nome:"dileggiatore", genere:"M"}
  },
  {italiano:
    {nome:"allievo", genere:"M"},
  albertese:
    {nome:"discente", genere:"M"}
  },
  {italiano:
    {nome:"alterazione", genere:"F"},
  albertese:
    {nome:"discrasia", genere:"F"}
  },
  {italiano:
    {nome:"successore", genere:"M"},
  albertese:
    {nome:"epigono", genere:"M"}
  },
  {italiano:
    {nome:"caso specifico", genere:"M"},
   albertese:
    {nome:"fattispecie", genere:"F"}
  },
  {italiano:
    {nome:"vergogna", genere:"F"},
   albertese:
    {nome:"ignominia", genere:"F"}
  },
  {italiano:
    {nome:"conclusione", genere:"F"},
   albertese:
    {nome:"illazione", genere:"F"}
  },
  {italiano:
    {nome:"insulto", genere:"M"},
  albertese:
    {nome:"improperio", genere:"M"},
  },
{italiano:
  {nome:"messaggero", genere:"M"},
  albertese:
  {nome:"latore", genere:"M"},
},
{italiano:
  {nome:"sovrabbondanza", genere:"F"},
  albertese:
  {nome:"pleonasmo", genere:"M"}
},
{italiano:
  {nome:"contrarietà", genere:"F"},
  albertese:
  {nome:"ritrosia", genere:"F"}
},
{italiano:
  {nome:"riassunto", genere:"M"},
  albertese:
  {nome:"sinossi", genere:"F"}
},
{italiano:
  {nome:"vanitoso", genere:"M"},
  albertese:
  {nome:"vanesio", genere:"M"}
},
{italiano:
  {nome:"offesa", genere:"F"},
  albertese:
  {nome:"vituperio", genere:"M"}
}
];

var verbs = [
  {italiano:
  {presente: "impoverisce"},
    albertese:
  {presente: "depaupera"}
  },
{italiano:
  {presente: "prende in giro"},
  albertese:
  {presente: "dileggia"}
},
{italiano:
  {presente: "prova"},
  albertese:
  {presente: "esperisce"}
},
{italiano:
  {presente: "esegue"},
  albertese:
  {presente: "ottempera a"}
},
{italiano:
  {presente: "rimanda"},
  albertese:
  {presente: "procrastina"}
},
{italiano:
  {presente: "offende"},
  albertese:
  {presente: "vitupera"}
},
{italiano:
  {presente: "priva di autorità"},
  albertese:
  {presente: "esautora"}
}
];

var adjectives = [
{italiano:
  {M:"insolito", F:"insolita"},
    albertese:
  {M:"desueto", F:"desueta"}
},
{italiano:
  {M:"amareggiato", F:"amareggiata"},
  albertese:
  {M:"esacerbato", F:"esacerbata"}
},
{italiano:
  {M:"misero", F:"misera"},
  albertese:
  {M:"micragnoso", F:"micragnosa"}
},
{italiano:
  {M:"carico", F:"carica"},
  albertese:
  {M:"onusto", F:"onusta"}
},
{italiano:
  {M:"superfluo", F:"superflua"},
  albertese:
  {M:"pleonastico", F:"pleonastica"}
},
{italiano:
  {M:"arrogante", F:"arrogante"},
  albertese:
  {M:"protervo", F:"proterva"}
},
{italiano:
  {M:"lamentoso", F:"lamentosa"},
  albertese:
  {M:"querulo", F:"querula"}
},
{italiano:
  {M:"enorme", F:"enorme"},
  albertese:
  {M:"sesquipedale", F:"sesquipedale"}
},
{italiano:
  {M:"miracoloso", F:"miracolosa"},
  albertese:
  {M:"taumaturgico", F:"taumaturgica"}
},
{italiano:
  {M:"infame", F:"infame"},
  albertese:
  {M:"turpe", F:"turpe"}
},
{italiano:
  {M:"vanitoso", F:"vanitosa"},
  albertese:
  {M:"vanesio", F:"vanesia"}
}
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
