var Balloon = Spine.Controller.sub({
  init: function(elements) {
    this.renderNewBalloon();
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

  renderCurrentBalloon: function() {
    var template = $("#quoteTemplate").tmpl(this.item, {
      currentQuote: this.item[this.item.displaying]
    });
    this.el.html(template);
  },

  toggleLanguage: function(event) {
    event.preventDefault();
    this.nextToggle();
  },

  toItaliano: function() {
    this.item.displaying = "italiano";
    this.item.save();
    this.nextToggle = this.toAlbertese;
    this.renderCurrentBalloon();
  },

  toAlbertese: function() {
    this.item.displaying = "albertese";
    this.item.save();
    this.nextToggle = this.toItaliano;
    this.renderCurrentBalloon();
  },

});
