var Sentence = Spine.Model.sub();
Sentence.configure("Sentence", "albertese", "italiano", "displaying");
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
        this.sentence.albertese = "you found a secret phrase!";
        this.sentence.italiano = "you found a secret phrase!";
        this.sentence.save();
                this.keys = [];
              }        
    },

});

var SlaApp = Spine.Controller.sub({
  init: function() {
    this.renderNewBalloon();
    this.renderVersion();
    Sentence.bind('create', this.proxy(this.renderNewBalloon)); 
    Sentence.bind('update', this.proxy(this.renderCurrentBalloon)); 
    Metadata.bind('refresh change', this.proxy(this.renderVersion)); 
  },

    metadata: undefined,

    sentence: new Sentence({
      albertese:"",
      italiano:"",
    }),

  events: {
    "click #balloon": "saySomething",
    "click .action-button": "preventBubbling",
    "click #italian-button": "toggleLanguage",
  },

  elements: {
    "#balloon": "balloon",
    "#version-holder": "versionHolder",
  },

  saySomething: function() {
    var self = this;
    self.sentence = new Sentence();
    $.getJSON("/generate-sentence", function(data) {
      self.sentence.albertese = data.albertese;
      self.sentence.italiano = data.italiano;
      self.sentence.displaying = "albertese";
      self.nextToggle = self.toItaliano; 
      self.sentence.save();
    })
  },

  toggleLanguage: function(event) {
    event.preventDefault();
    this.nextToggle();
  },

  toItaliano: function() {
    this.sentence.displaying = "italiano";
    this.sentence.save();
    this.nextToggle = this.toAlbertese;
  },

  toAlbertese: function() {
    this.sentence.displaying = "albertese";
    this.sentence.save();
    this.nextToggle = this.toItaliano;
  },

  nextToggle: this.toItaliano,

  preventBubbling: function(event) {
    event.stopPropagation();
  },

  renderNewBalloon: function() {
    this.balloon.hide();
    this.renderCurrentBalloon();
    this.balloon.show(500);
  },

  renderCurrentBalloon: function() {
    var template = $("#quoteTemplate").tmpl(this.sentence, {
      currentQuote: this.sentence[this.sentence.displaying]
    });
    this.balloon.html(template);
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
