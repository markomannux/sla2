jQuery(function($) {
  var metadata = new Metadata();
  $.get("metadata.json", function(data) {
    $.extend(metadata, data); 
    metadata.save();
  },"json");

  new History({
    el: $(".container"),
  });

  var balloon = new Balloon({el:$("#balloon"), item: new Sentence()});

  new KonamiCodeController({
    el: $(".container"),
  });

  return new SlaApp({
    el: $(".container"),
         balloon: balloon,
         metadata: metadata
  });
});
