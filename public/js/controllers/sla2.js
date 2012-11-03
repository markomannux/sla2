var SlaApp = Spine.Controller.sub({
  init: function() {
    this.renderVersion();
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
    var requestId = new Date().getTime();
    $.getJSON("/generate-sentence", {rid:requestId}, function(data) {
      sentence.albertese = data.albertese;
      sentence.italiano = data.italiano;
      sentence.save();
    })
  },

  renderVersion: function() {
    var template = $("#versionTemplate").tmpl(this.metadata);
    this.versionHolder.html(template);
  }
});
