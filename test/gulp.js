import '../src'
import bufferEqual from 'buffer-equal'
import gulp from 'gulp'
import rump from 'rump'
import timeout from 'timeout-then'
import {colors} from 'gulp-util'
import {readFile, writeFile} from 'mz/fs'
import {sep} from 'path'
import {spy} from 'sinon'

const {stripColor} = colors

describe('tasks', function() {
  this.timeout(0)

  beforeEach(() => {
    rump.configure({paths: {
      source: {root: 'test/fixtures', static: ''},
      destination: {root: 'tmp'},
    }})
  })

  it('are added and defined', () => {
    const callback = spy()
    rump.on('gulp:main', callback)
    rump.on('gulp:static', callback)
    rump.addGulpTasks({prefix: 'spec'})
    callback.should.be.calledTwice()
    gulp.tasks['spec:info:static'].should.be.ok()
    gulp.tasks['spec:build:static'].should.be.ok()
    gulp.tasks['spec:watch:static'].should.be.ok()
  })

  it('display correct information in info task', () => {
    const logs = [],
          {log} = console
    console.log = (...args) => logs.push(stripColor(args.join(' ')))
    gulp.start('spec:info')
    console.log = log
    logs.slice(-6).should.eql([
      '',
      '--- Static v0.7.0',
      `Static files from test${sep}fixtures are copied to tmp`,
      'Affected files:',
      'index.html',
      '',
    ])
  })

  describe('for building', () => {
    let original

    before(async() => {
      original = await readFile('test/fixtures/index.html')
      await new Promise(resolve => {
        gulp.task('postbuild', ['spec:watch'], resolve)
        gulp.start('postbuild')
      })
      await timeout(1000)
    })

    after(async() => await writeFile('test/fixtures/index.html', original))

    it('handles updates', async() => {
      console.log(1)
      let content = await readFile('tmp/index.html')
      console.log(2)
      bufferEqual(content, original).should.be.true()
      console.log(3)
      await writeFile('test/fixtures/index.html', '<h1>New</h1>')
      console.log(4)
      await timeout(1000)
      console.log(5)
      content = await readFile('tmp/index.html')
      console.log(6)
      bufferEqual(content, original).should.be.false()
      console.log(7)
    })
  })
})
