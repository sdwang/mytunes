// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({

  play: function() {
    this.trigger('play', this);
  },

  ended: function(){
    this.set('playCount', this.get('playCount')+1);
    this.trigger('ended', this);
  },

  dequeue: function(){
    this.trigger('dequeue', this);
  },

  defaults: {
    'playCount': 0
  }

});
