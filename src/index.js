import rump from 'rump'
import {rebuild} from './configs'

rump.on('update:main', () => {
  rebuild()
  rump.emit('update:static')
})

rump.on('gulp:main', (...args) => {
  require('./gulp')
  rump.emit('gulp:static', ...args)
})
