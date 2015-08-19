import gulp, {tasks} from 'gulp'
import changed from 'gulp-changed'
import plumber from 'gulp-plumber'
import rump from 'rump'
import {noop} from 'gulp-util'
import {join} from 'path'

const dest = ::gulp.dest,
      name = ::rump.taskName,
      src = ::gulp.src,
      task = ::gulp.task,
      {configs} = rump

task(name('build:static'), () => {
  const source = join(configs.main.paths.source.root,
                      configs.main.paths.source.static,
                      configs.main.globs.build.static),
        destination = join(configs.main.paths.destination.root,
                           configs.main.paths.destination.static)
  return src([source].concat(configs.main.globs.global))
    .pipe((configs.watch ? plumber : noop)())
    .pipe((configs.watch ? changed : noop)(destination))
    .pipe(dest(destination))
})

tasks[name('build')].dep.push(name('build:static'))
