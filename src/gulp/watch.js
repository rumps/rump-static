import gulp, {tasks} from 'gulp'
import rump from 'rump'
import {join} from 'path'

const name = ::rump.taskName
const task = ::gulp.task
const watch = ::gulp.watch
const {configs} = rump

task(name('watch:static'), [name('build:static')], () => {
  const glob = join(configs.main.paths.source.root,
                    configs.main.paths.source.static,
                    configs.main.globs.watch.static)
  watch([glob].concat(configs.main.globs.global), [name('build:static')])
})

tasks[name('watch')].dep.push(name('watch:static'))
