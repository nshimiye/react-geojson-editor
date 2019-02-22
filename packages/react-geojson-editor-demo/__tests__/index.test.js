'use strict';

var userge = require('../lib/index.js'); 

var assert = require('assert');
describe('Use GeoJson', function() {
    it('should return a GeoJson message', function() {
      assert.equal(userge.getMessage(), 'React GeoJson Editor');
    });
});