import extend from 'extend'
import rump from 'rump'

const {configs} = rump

rebuild()

export function rebuild() {
  configs.main.globs = extend(true, {
    build: {static: '**/*'},
    watch: {static: '**/*'},
  }, configs.main.globs)
  configs.main.paths = extend(true, {
    source: {static: 'static'},
    destination: {static: ''},
  }, configs.main.paths)
}
