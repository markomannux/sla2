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
