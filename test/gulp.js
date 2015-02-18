'use strict';

var assert = require('better-assert');
var fs = require('graceful-fs');
var gulp = require('gulp');
var any = require('lodash/collection/any');
var toArray = require('lodash/lang/toArray');
var util = require('gulp-util');
var rump = require('../lib');
var configs = require('../lib/configs');

describe('rump static tasks', function() {
  var original;

  before(function() {
    original = fs.readFileSync('test/src/index.html').toString();
    rump.addGulpTasks({prefix: 'spec'});
  });

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

  after(function() {
    fs.writeFileSync('test/src/index.html', original);
  });

  it('are defined', function() {
    assert(gulp.tasks['spec:info:static']);
    assert(gulp.tasks['spec:build:static']);
    assert(gulp.tasks['spec:watch:static']);
  });

  it('info:static', function() {
    var oldLog = console.log;
    var logs = [];
    console.log = function() {
      logs.push(util.colors.stripColor(toArray(arguments).join(' ')));
    };
    gulp.start('spec:info');
    console.log = oldLog;
    assert(any(logs, hasPaths));
    assert(any(logs, hasHtmlFile));
  });

  it('build:static, watch:static', function(done) {
    gulp.task('postbuild', ['spec:watch'], function() {
      assert(fs.readFileSync('tmp/index.html').toString() === original);
      timeout(function() {
        fs.writeFileSync('test/src/index.html', '<h1>New</h1>');
        timeout(function() {
          assert(fs.readFileSync('tmp/index.html').toString() !== original);
          done();
        }, 950);
      }, 950);
    });
    gulp.start('postbuild');
  });
});

function hasHtmlFile(log) {
  return log === 'index.html';
}

function hasPaths(log) {
  return ~log.indexOf('test/src') && ~log.indexOf('tmp');
}

function timeout(cb, delay) {
  process.nextTick(function() {
    setTimeout(function() {
      process.nextTick(cb);
    }, delay || 0);
  });
}
