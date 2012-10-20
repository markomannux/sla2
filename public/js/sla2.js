var Sentence = Spine.Model.sub();
Sentence.configure("Sentence", "body");
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
        this.sentence.body = "you found a secret phrase!";
        this.sentence.save();
                this.keys = [];
              }        
    },

});

var SlaApp = Spine.Controller.sub({
  init: function() {
    this.render();
    this.renderVersion();
    Sentence.bind('refresh change', this.proxy(this.render)); 
    Metadata.bind('refresh change', this.proxy(this.renderVersion)); 
  },

    metadata: undefined,

    sentence: new Sentence({
      body:"",
    }),

  events: {
    "click #balloon": "saySomething",
    "click .action-button": "preventBubbling",
  },

  elements: {
    "#balloon": "balloon",
    "#balloon p": "quote",
    "#version-holder": "versionHolder"
  },

  saySomething: function() {
    _sentence = this.sentence
    $.get("/generate-sentence", function(data) {
      _sentence.body = data;
      _sentence.save();
    })
  },

  preventBubbling: function(event) {
    event.stopPropagation();
  },

  render: function() {
    this.balloon.hide();
    var template = $("#quoteTemplate").tmpl(this.sentence);
    this.balloon.html(template);
    this.balloon.show(500);
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
    body: ""
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
