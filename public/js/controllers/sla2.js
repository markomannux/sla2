var SlaApp = Spine.Controller.sub({
  init: function() {
    this.renderVersion();
    Sentence.bind('create', this.proxy(this.addOne)); 
    Metadata.bind('refresh change', this.proxy(this.renderVersion)); 
  },

  events: {
    "click #balloon": "saySomething",
  },

  elements: {
    "#version-holder": "versionHolder",
  },

  saySomething: function() {
    var sentence = new Sentence();
    $.getJSON("/generate-sentence", function(data) {
      sentence.albertese = data.albertese;
      sentence.italiano = data.italiano;
      sentence.displaying = "albertese";
      sentence.save();
    })
  },

  addOne: function(item) {
    this.balloon.bindSentence(item);
  },

  renderVersion: function() {
    var template = $("#versionTemplate").tmpl(this.metadata);
    this.versionHolder.html(template);
  }
});
