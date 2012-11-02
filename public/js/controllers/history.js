var History = Spine.Controller.sub({
  elements: {
    "#sentences": "sentences",
    "#history-button": "button",
    "#clear-history-button": "clearButton",
    "#history": "history",
  },

  events: {
    "click #clear-history-button": "clearHistory",
  },

  historySize: 0,

  buttonTemplate: function() {
    return($("#historyButtonTemplate").tmpl({historySize:this.historySize}));
  },

  init: function() {
    Sentence.bind("create", this.proxy(this.addOne));
  },

  addOne: function(sentence) {
    var historyItem = new HistoryItem({item: sentence, balloon:this.balloon});
    var historyItemElement = historyItem.render();
    historyItemElement.hide();
    this.sentences.prepend(historyItemElement);
    historyItemElement.show(500);
    this.historySize++;
    this.renderButton();
    if (this.historySize > 0) {
      this.button.show(500);
    }
  },

  renderButton: function() {
    this.button.html(this.buttonTemplate());
  },

  clearHistory: function() {
    this.history.collapse('hide');
    this.sentences.html('');
    this.historySize = 0;
    this.renderButton();
    this.button.hide(500);
  },

});

var HistoryItem = Spine.Controller.sub({
  events: {
    "click": "click"
  },

  init: function() {
    if (!this.item) throw "@item required";
    this.item.bind("update", this.proxy(this.render));
  },

  template: function(item) {
    return($("#sentencesTemplate").tmpl(item));
  },

  render: function(item) {
    if (item) this.item = item;

    this.el.html(this.template(this.item));
    return this.el;
  },

  click: function() {
    if (!this.balloon) throw "@balloon required";
    this.balloon.bindSentence(this.item);
  }
});
