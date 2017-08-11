import test from 'ava';

import Store from '../src/';

function checkOnBread(state) {
  var availableBread = state.get('bread');

  console.log(`We have ${availableBread.join(' ')}`);
}

function watchBread() {
  var store = Store.getInstance();

  return store.subscribe(checkOnBread);
}

/**
 * This gets called after all the tests
*/
var unwatchBread = watchBread();

test(function(t) {
  var store = Store.getInstance();

  store.dispatch({
    bread: ['sourdough', 'plain-bread'],
  });

  t.is(store.get('bread').get(0), 'sourdough', 'First bread is sourdough');
});

test(function(t) {
  var store = Store.getInstance(),
    availableBread = store.get('bread');

  store.dispatch({
    bread: [...availableBread, 'fancy-bread'],
  });

  t.is(store.get('bread').get(2), 'fancy-bread', 'Third bread is fancy-bread');
});

test(function(t) {
  var store = Store.getInstance();

  store.dispatch({
    bread: ['fancy-bread'],
  });

  t.is(store.get('bread').get(0), 'fancy-bread', 'First bread is fancy-bread');
});

test.after(function(t) {
  /**
    No more bread
  */
  unwatchBread();
});
