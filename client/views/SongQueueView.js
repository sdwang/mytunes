// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "table",

  initialize: function() {
    //this.collection.on('add', this.render, this);
    //this.collection.on('remove', this.handleRemove, this);
    this.render();
    this.collection.on('add remove', this.handleAll, this);
  },
  
  handleAll: function(){
    this.render();
    for(var i = 0; i < this.collection.length; i++) {
      this.collection.at(i).set('queuePosition',i);
    }
    this.collection.trigger('saveLibrary', this);
  },

  render: function() {
    this.$el.html('<th>Queue</th>').append(
      this.collection.map(function(song) {
        return new SongQueueEntryView({model: song}).render();
      })
    );
  }



});
