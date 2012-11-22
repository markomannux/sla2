jQuery(function($) {
  var metadata = new Metadata();
  $.get("metadata.json", function(data) {
    $.extend(metadata, data); 
    metadata.save();
  },"json");

  var balloon = new Balloon({el:$("#balloon"), item: new Sentence()});

  new KonamiCodeController({
    el: $(".container"),
  });

  new History({
    el: $(".container"),
     balloon: balloon,
  });

  return new SlaApp({
    el: $(".container"),
     balloon: balloon,
     metadata: metadata
  });
});
