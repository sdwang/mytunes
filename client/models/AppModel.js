// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({ 

  initialize: function(params) {
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());

    // this.set('app_router', new AppRouter());

    // this.get('app_router').on('route:testSplash', function(info){
    //   console.log('splash data is ' + info);
    // });
    
    // if(!Backbone.history){
    // Backbone.history.start();
    // }
    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the function (this.set('currentSong', song)) would
    end up referring to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */
    var arrayQueue = [];
    for(var i = 0; i < params.library.length; i++){
      arrayQueue[params.library.at(i).get('queuePosition')] = params.library.at(i); 
    }
    for(var i = 0; i < arrayQueue.length; i++){
      this.get('songQueue').add(arrayQueue[i]);
    }

    params.library.on('play', function(song) {
      if (this.get('currentSong').get('title')){
        song.set('queuePosition', this.get('songQueue').length);
        this.get('songQueue').add(song);
      } else {
        this.set('currentSong', song);
      }
    }, this);

    params.library.on('ended', function(song){
      window.localStorage.setItem('songs', JSON.stringify(params.library));
      if(this.get('songQueue').at(0) === this.get('currentSong')) {
        this.trigger('change:currentSong', this);
      }
      if(this.get('songQueue').length === 0) {
        this.set('currentSong', new SongModel());
      } else {
        this.set('currentSong', this.get('songQueue').at(0));
        this.get('songQueue').at(0).set('queuePosition', -1);
        this.get('songQueue').remove(this.get('songQueue').at(0));
      }
    }, this);

    params.library.on('dequeue', function(song){
      song.set('queuePosition', -1);
      this.get('songQueue').remove(song);
    }, this);

    this.get('songQueue').on('saveLibrary', function() {
      window.localStorage.setItem('songs',JSON.stringify(params.library));
    })

  }

});
