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

describe('tasks', () => {
  beforeEach(() => {
    rump.configure({paths: {
      source: {root: 'test/src', static: ''},
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
      `Static files from test${sep}src are copied to tmp`,
      'Affected files:',
      'index.html',
      '',
    ])
  })

  describe('for building', () => {
    let original

    before(async() => original = await readFile('test/src/index.html'))

    before(done => {
      gulp.task('postbuild', ['spec:watch'], () => done())
      gulp.start('postbuild')
    })

    after(async() => await writeFile('test/src/index.html', original))

    it('handles updates', function(done) {
      this.timeout(0)
      async() => {
        let content = await readFile('tmp/index.html')
        bufferEqual(content, original).should.be.true()
        await timeout(1000)
        await writeFile('test/src/index.html', '<h1>New</h1>')
        await timeout(1000)
        content = await readFile('tmp/index.html')
        bufferEqual(content, original).should.be.false()
        done()
      }()
    })
  })
})
