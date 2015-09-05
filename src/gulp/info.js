import gulp, {tasks} from 'gulp'
import rump from 'rump'
import {find} from 'globule'
import {colors} from 'gulp-util'
import {join, relative} from 'path'
import {version} from '../../package'

const name = ::rump.taskName
const task = ::gulp.task
const {blue, green, magenta} = colors
const {configs} = rump

task(name('info:static'), () => {
  const glob = join(configs.main.paths.source.root,
                    configs.main.paths.source.static,
                    configs.main.globs.build.static)
  const files = find([glob].concat(configs.main.globs.global))
  const source = join(configs.main.paths.source.root,
                      configs.main.paths.source.static)
  const destination = join(configs.main.paths.destination.root,
                           configs.main.paths.destination.static)
  if (!files.length) {
    return
  }
  console.log()
  console.log(magenta(`--- Static v${version}`))
  console.log(`Static files from ${green(source)}`,
              `are copied to ${green(destination)}`)
  console.log('Affected files:')
  files.forEach(file => console.log(blue(relative(source, file))))
  console.log()
})

tasks[name('info')].dep.push(name('info:static'))
