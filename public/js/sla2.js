var Sentence = Spine.Model.sub();
Sentence.configure("Sentence", "body");
var Metadata= Spine.Model.sub();
Metadata.configure("Metadata", "version");

var KonamiCodeController = Spine.Controller.sub({
  init: function() {
    $(document).bind('keydown', this.proxy(this.checkCode)); 
  },

    sentence: undefined,
    keys: [],
    konami: '38,38,40,40,37,39,37,39,66,65',

    checkCode: function(event) {
      console.log("check");
      this.keys.push( event.keyCode );
      if ( this.keys.toString().indexOf( this.konami ) >= 0 ){
        this.sentence.body = "you found a secret phrase!";
        this.sentence.save();
                this.keys = [];
              }        
    },

});

var SlaApp = Spine.Controller.sub({
  init: function() {
    this.render();
    this.renderVersion();
    Sentence.bind('refresh change', this.proxy(this.render)); 
    Metadata.bind('refresh change', this.proxy(this.renderVersion)); 
  },

    metadata: undefined,

    sentence: new Sentence({
      body:"",
    }),

    nouns: [
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
  ],

  verbs: [
  "depaupera",
  "dileggia",
  "esperisce",
  "ottempera a",
  "procrastina",
  "vitupera",
  "esautora",
  ],

  adjectives: [
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
  ],

  events: {
    "click #balloon": "saySomething",
    "click .action-button": "preventBubbling",
  },

  elements: {
    "#balloon": "balloon",
    "#balloon p": "quote",
    "#version-holder": "versionHolder"
  },

  saySomething: function() {
    var subject = this.pickRandom(this.nouns);
    var verb = this.pickRandom(this.verbs);
    var obj = this.pickRandom(this.nouns);
    var adjective1 = this.pickRandom(this.adjectives);
    var adjective2 = this.pickRandom(this.adjectives);
    this.sentence.body = this.selectArticoloDet(adjective1[subject.genere], subject.genere) + " " + adjective1[subject.genere] + " " + subject.nome + " " + verb + " " + this.selectArticoloInd(adjective2[obj.genere], obj.genere) + " " + adjective2[obj.genere] + " " + obj.nome;
    this.sentence.body = this.sentence.body.charAt(0).toUpperCase() + this.sentence.body.slice(1) + ".";
    this.sentence.save();
  },

  selectArticoloDet: function(parola, genere) {
    if (this.startsWithVowel(parola)) {
      return "l'";
    } else if (genere == "M") {
      return "il";
    } else {
      return "la";
    }
  },

  selectArticoloInd: function(parola, genere) {
    if (this.startsWithVowel(parola)) {
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
  },

  startsWithVowel: function(word) {
    var initial = $.inArray(word.charAt(0), ['a', 'e', 'i', 'o', 'u']);
    return initial > -1;
  },

  pickRandom: function(list) {
    return list[Math.floor(Math.random()*list.length)];
  },

  preventBubbling: function(event) {
    event.stopPropagation();
  },

  render: function() {
    this.balloon.hide();
    var template = $("#quoteTemplate").tmpl(this.sentence);
    this.balloon.html(template);
    this.balloon.show(500);
  },

  renderVersion: function() {
    var template = $("#versionTemplate").tmpl(this.metadata);
    this.versionHolder.html(template);
  }
});

jQuery(function($) {
  var metadata = new Metadata();
  $.get("metadata.json", function(data) {
    $.extend(metadata, data); 
    metadata.save();
  },"json");

  var sentence = new Sentence({
    body: ""
  });

  new KonamiCodeController({
    el: $(".container"),
      sentence: sentence
  });

  return new SlaApp({
    el: $(".container"),
         sentence: sentence,
         metadata: metadata
  });
});
