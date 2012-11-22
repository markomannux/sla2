var Balloon = Spine.Controller.sub({
  init: function(elements) {
    this.renderNewBalloon();
    Sentence.bind('create', this.proxy(this.bindSentence)); 
  },

  events: {
    "click .action-button": "preventBubbling",
    "click #italian-button": "toggleLanguage",
  },

  preventBubbling: function(event) {
    event.stopPropagation();
  },

  bindSentence: function(sentence) {
    if (sentence) {
      this.item = sentence;
      this.nextToggle = this.toItaliano;
    }
    this.renderNewBalloon();
  },

  renderNewBalloon: function(item) {
    this.el.hide();
    this.renderCurrentBalloon();
    this.el.show(500);
  },

  renderCurrentBalloon: function(form) {
    if(!form) {
      form = "albertese"
    }
    var template = $("#quoteTemplate").tmpl(this.item, {
      currentQuote: this.item[form],
      displaying: form
    });
    this.el.html(template);
  },

  toggleLanguage: function(event) {
    event.preventDefault();
    this.nextToggle();
  },

  toItaliano: function() {
    this.item.save();
    this.nextToggle = this.toAlbertese;
    this.renderCurrentBalloon("italiano");
  },

  toAlbertese: function() {
    this.item.save();
    this.nextToggle = this.toItaliano;
    this.renderCurrentBalloon("albertese");
  },

});
