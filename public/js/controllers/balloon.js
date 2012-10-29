var Balloon = Spine.Controller.sub({
  init: function(elements) {
    console.log("init balloon");
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
      this.item.unbind("update");
      this.item = sentence;
      this.item.bind("update", this.proxy(this.renderCurrentBalloon));
      this.nextToggle = this.toItaliano;
    }
    this.renderNewBalloon();
  },

  renderNewBalloon: function(item) {
    console.log("render new balloon");
    this.el.hide();
    this.renderCurrentBalloon();
    this.el.show(500);
  },

  renderCurrentBalloon: function() {
    console.log("current");
    var template = $("#quoteTemplate").tmpl(this.item, {
      currentQuote: this.item[this.item.displaying]
    });
    this.el.html(template);
  },

  toggleLanguage: function(event) {
    console.log("toggle");
    event.preventDefault();
    this.nextToggle();
  },

  toItaliano: function() {
    console.log("it");
    this.item.displaying = "italiano";
    this.item.save();
    this.nextToggle = this.toAlbertese;
  },

  toAlbertese: function() {
    this.item.displaying = "albertese";
    this.item.save();
    this.nextToggle = this.toItaliano;
  },

});
