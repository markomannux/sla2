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
        this.sentence.albertese = "you found a secret phrase!";
        this.sentence.italiano = "you found a secret phrase!";
        this.sentence.save();
                this.keys = [];
              }        
    },

});
