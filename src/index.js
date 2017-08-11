import { Map } from 'immutable';

var singletonState = (function() {
  var instance;

  function State() {
    this.state = Map({});
    this.listeners = [];
    this.stateHistory = [this.state];

    this.subscribe = function(callback) {
      this.listeners.push(callback);

      return () => {
        this.listeners = this.listeners.filter(function(registeredListener) {
          return registeredListener !== callback;
        });
      };
    };

    this.notify = function() {
      this.listeners.forEach(eventListener => {
        eventListener(this.state);
      });
    };

    this.get = function(property) {
      return this.state.get(property);
    };

    this.dispatch = function(data) {
      this.state = this.state.merge(data);

      this.stateHistory = [...this.stateHistory, this.state];

      this.notify();
    };
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = new State();
      }

      return instance;
    },
  };
})();

export default singletonState;
module.exports = singletonState;
