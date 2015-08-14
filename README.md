# Rump Static
[![NPM](http://img.shields.io/npm/v/rump-static.svg?style=flat-square)](https://www.npmjs.org/package/rump-static)
![License](http://img.shields.io/npm/l/rump-static.svg?style=flat-square)


## Status

### Master
[![Dependencies](http://img.shields.io/david/rumps/static.svg?style=flat-square)](https://david-dm.org/rumps/static)
[![Dev Dependencies](http://img.shields.io/david/dev/rumps/static.svg?style=flat-square)](https://david-dm.org/rumps/static#info=devDependencies)
<br>
[![Travis](http://img.shields.io/travis/rumps/static.svg?style=flat-square&label=travis)](https://travis-ci.org/rumps/static)
[![Appveyor](http://img.shields.io/appveyor/ci/jupl/rump-static.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/jupl/rump-static)
[![Codecov](http://img.shields.io/codecov/c/github/rumps/static.svg?style=flat-square&label=codecov)](https://codecov.io/github/rumps/static?view=all)

### Develop
[![Dependencies](http://img.shields.io/david/rumps/static/develop.svg?style=flat-square)](https://david-dm.org/rumps/static/develop)
[![Dev Dependencies](http://img.shields.io/david/dev/rumps/static/develop.svg?style=flat-square)](https://david-dm.org/rumps/static/develop#info=devDependencies)
<br>
[![Travis](http://img.shields.io/travis/rumps/static/develop.svg?style=flat-square&label=travis)](https://travis-ci.org/rumps/static)
[![Appveyor](http://img.shields.io/appveyor/ci/jupl/rump-static/develop.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/jupl/rump-static)
[![Codecov](http://img.shields.io/codecov/c/github/rumps/static/develop.svg?style=flat-square&label=codecov)](https://codecov.io/github/rumps/static?branch=develop&view=all)


## About
Rump Static is a Rump module that handles copying static files as is. For more
information, visit the [core repository](https://github.com/rumps/core).


## API
The following is appended to the core Rump API:

### `rump.addGulpTasks(options)`
This module adds the following tasks:

- `build:static` will copy all files from source to destination. This task is
also added to the `build` task. For more information on source and destination
paths see `rump.configure()` below. This task is also added to the `build`
task.
- `watch:static` will run `build:static`, then monitor for changes and copy
updated files as needed. This task is also added to the `watch` task.
- `info:static` will display information on what this specific module does,
specifically the source and destination paths as well as what files would get
copied. This task is also added to the `info` task.

### `rump.configure(options)`
Redefine options for Rump and Rump modules to follow. In addition to what
options Rump and other Rump modules offer, the following options are
available alongside default values:

#### `options.paths.source.static` (`'static'`)
This is the directory where static files to be copied are contained. This path
is relative to the root source path. (If the default root and static path is
used, then the path would be `src/static`)

#### `options.paths.destination.static` (`''`)
This is the directory where static files are copied to. This path is relative
to the root destination path. (If the default root and static path is used,
then the path would be `dist`)

#### `options.globs.build.static` (`'**/*'`)
This specifies which static files to copy. By default it copies all static
files, including those in subdirectories.

#### `options.globs.watch.static` (`'**/*'`)
This specifies which static files to monitor for changes. By default it watches
all static files, including those in subdirectories.
