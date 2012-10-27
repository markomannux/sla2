var Sentencebar = Spine.Controller.sub({
  elements: {
    "#sentences": "sentences"
  },

  template: function(sentences) {
    console.log("called template");
    return($("#sentencesTemplate").tmpl(sentences));
  },

  init: function() {
    this.list = new Spine.List({
      el: this.sentences,
      template: this.template
    });
    
    //TODO handle change selected
    //TODO handle sentence created
    
    Sentence.bind("refresh change", this.proxy(this.render));
  },

  render: function() {
    var sentences = Sentence.all();
    this.list.render(sentences);
  },

});
