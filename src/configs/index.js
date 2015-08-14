import extend from 'extend'
import rump from 'rump'

rebuild()

export function rebuild() {
  rump.configs.main.globs = extend(true, {
    build: {static: '**/*'},
    watch: {static: '**/*'},
  }, rump.configs.main.globs)
  rump.configs.main.paths = extend(true, {
    source: {static: 'static'},
    destination: {static: ''},
  }, rump.configs.main.paths)
}
