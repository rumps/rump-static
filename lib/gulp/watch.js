'use strict';

var gulp = require('gulp');
var path = require('path');
var rump = require('rump');

gulp.task(rump.taskName('watch:static'),
          [rump.taskName('build:static')],
          function() {
  var glob = path.join(rump.configs.main.paths.source.root,
                       rump.configs.main.paths.source.static,
                       rump.configs.main.globs.watch.static);
  gulp.watch([glob].concat(rump.configs.main.globs.global),
             [rump.taskName('build:static')]);
});

gulp.tasks[rump.taskName('watch')].dep.push(rump.taskName('watch:static'));
