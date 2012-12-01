

var Emoney = Ember.Application.create({
  ready: function() {
    this._super();
  }
});


Emoney.store = DS.Store.create({
  revision:8,
  adapter: DS.localStorageAdapter.create({})
});
