'use strict';

require('babel/register')({
  whitelist: ['regenerator']
});

// Temporary fix until old LoDash is updated in some Gulp dependency
Object.getPrototypeOf.toString = function() {
  return 'function getPrototypeOf() { [native code] }';
};
