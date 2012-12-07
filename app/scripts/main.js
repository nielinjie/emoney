

var Emoney = Ember.Application.create({
  ready: function() {
    this._super();
  }
});

Emoney.localAdapter=DS.localStorageAdapter.create({})
Emoney.localAdapter.registerTransform('obj',{
    fromData: function(serialized) {

       return serialized ? JSON.parse(serialized) : null
    },

    toData: function(deserialized) {
        return JSON.stringify(deserialized)
    }
})

Emoney.store = DS.Store.create({
  revision:8,
  adapter: Emoney.localAdapter
});


