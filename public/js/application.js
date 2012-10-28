jQuery(function($) {
  var metadata = new Metadata();
  $.get("metadata.json", function(data) {
    $.extend(metadata, data); 
    metadata.save();
  },"json");

  new Sentencebar({
    el: $(".container"),
  });

  new KonamiCodeController({
    el: $(".container"),
  });

  return new SlaApp({
    el: $(".container"),
         metadata: metadata
  });
});
