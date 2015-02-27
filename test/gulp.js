'use strict';

// Temporary fix until old LoDash is updated in some Gulp dependency
Object.getPrototypeOf.toString = function() {
  return 'function getPrototypeOf() { [native code] }';
};

var assert = require('assert');
var bufferEqual = require('buffer-equal');
var co = require('co');
var fs = require('mz/fs');
var gulp = require('gulp');
var util = require('gulp-util');
var path = require('path');
var sinon = require('sinon');
var sleep = require('timeout-then');
var rump = require('../lib');

describe('rump static tasks', function() {
  beforeEach(function() {
    rump.configure({
      paths: {
        source: {
          root: 'test/src',
          static: ''
        },
        destination: {
          root: 'tmp'
        }
      }
    });
  });

  it('are added and defined', function() {
    var callback = sinon.spy();
    rump.on('gulp:main', callback);
    rump.on('gulp:static', callback);
    rump.addGulpTasks({prefix: 'spec'});
    // TODO Remove no callback check on next major core update
    assert(!callback.called || callback.calledTwice);
    assert(gulp.tasks['spec:info:static']);
    assert(gulp.tasks['spec:build:static']);
    assert(gulp.tasks['spec:watch:static']);
  });

  it('display correct information in info task', function() {
    var oldLog = console.log;
    var logs = [];
    console.log = function() {
      logs.push(util.colors.stripColor(Array.from(arguments).join(' ')));
    };
    gulp.start('spec:info');
    console.log = oldLog;
    assert(logs.some(hasPaths));
    assert(logs.some(hasHtmlFile));
  });


  describe('for building', function() {
    var original;

    before(co.wrap(function*() {
      original = yield fs.readFile('test/src/index.html');
    }));

    before(function(done) {
      gulp.task('postbuild', ['spec:watch'], function() {
        done();
      });
      gulp.start('postbuild');
    });

    after(co.wrap(function*() {
      yield sleep(800);
      yield fs.writeFile('test/src/index.html', original);
      yield sleep(800);
    }));

    it('handles updates', co.wrap(function*() {
      var content = yield fs.readFile('tmp/index.html');
      assert(bufferEqual(content, original));
      yield sleep(800);
      yield fs.writeFile('test/src/index.html', '<h1>New</h1>');
      yield sleep(800);
      content = yield fs.readFile('tmp/index.html');
      assert(!bufferEqual(content, original));
    }));
  });
});

function hasHtmlFile(log) {
  return log === 'index.html';
}

function hasPaths(log) {
  return log.includes(path.join('test', 'src')) && log.includes('tmp');
}
