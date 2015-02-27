'use strict';

// Temporary fix until old LoDash is updated in some Gulp dependency
Object.getPrototypeOf.toString = function() {
  return 'function getPrototypeOf() { [native code] }';
};

var assert = require('assert');
var co = require('co');
var fs = require('mz/fs');
var gulp = require('gulp');
var util = require('gulp-util');
var path = require('path');
var sinon = require('sinon');
var rump = require('../lib');
var configs = require('../lib/configs');

describe('rump static tasks', function() {
  var original;

  before(co.wrap(function*() {
    original = yield fs.readFile('test/src/index.html', 'utf8');
  }));

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
    configs.watch = false;
  });

  after(co.wrap(function*() {
    yield fs.writeFile('test/src/index.html', original);
  }));

  it('are added and defined', function() {
    var callback = sinon.spy();
    rump.on('gulp:main', callback);
    rump.on('gulp:static', callback);
    rump.addGulpTasks({prefix: 'spec'});
    // TODO Remove no callback check on next major core update
    assert(!callback.called || callback.calledTwice, 'callback may be called');
    assert(gulp.tasks['spec:info:static'], 'info task exists');
    assert(gulp.tasks['spec:build:static'], 'build task exists');
    assert(gulp.tasks['spec:watch:static'], 'watch task exists');
  });

  it('info:static', function() {
    var oldLog = console.log;
    var logs = [];
    console.log = function() {
      logs.push(util.colors.stripColor(Array.from(arguments).join(' ')));
    };
    gulp.start('spec:info');
    console.log = oldLog;
    assert(logs.some(hasPaths), 'paths are listed');
    assert(logs.some(hasHtmlFile), 'files are listed');
  });

  it('build:static, watch:static', function(done) {
    gulp.task('postbuild', ['spec:watch'], co.wrap(function*() {
      var content = yield fs.readFile('tmp/index.html', 'utf8');
      assert(content === original, 'file is copied');
      yield fs.writeFile('test/src/index.html', '<h1>New</h1>');
      content = yield fs.readFile('tmp/index.html', 'utf8');
      assert(content === original, 'file is updated');
      done();
    }));
    gulp.start('postbuild');
  });
});

function hasHtmlFile(log) {
  return log === 'index.html';
}

function hasPaths(log) {
  return log.includes(path.join('test', 'src')) && log.includes('tmp');
}
