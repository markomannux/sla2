var History = Spine.Controller.sub({
  elements: {
    "#sentences": "sentences",
    "#history-button": "button",
  },

  template: function(sentences) {
    return($("#sentencesTemplate").tmpl(sentences));
  },

  init: function() {
    //TODO handle change selected
    //TODO handle sentence created
    
    Sentence.bind("create", this.proxy(this.addOne));
  },

  addOne: function(sentence) {
    var historyItem = new HistoryItem({item: sentence, balloon:this.balloon});
    var historyItemElement = historyItem.render();
    historyItemElement.hide();
    this.sentences.prepend(historyItemElement);
    historyItemElement.show(500);
    this.button.show(500);
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
