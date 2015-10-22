// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({

  play: function() {
    this.trigger('play', this);
  },

  ended: function(){
    this.trigger('ended', this);
  },

  dequeue: function(){
    this.trigger('dequeue', this);
  }

});
