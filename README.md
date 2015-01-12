# Rump Static
[![NPM](http://img.shields.io/npm/v/rump-static.svg?style=flat-square)](https://www.npmjs.org/package/rump-static)
![License](http://img.shields.io/npm/l/rump-static.svg?style=flat-square)
[![Dependencies](http://img.shields.io/david/rumps/rump-static.svg?style=flat-square)](https://david-dm.org/rumps/rump-static)


## About
Rump Static is a Rump module that handles copying static files as is. For more
information, visit the [Rump repository](https://github.com/rumps/rump).


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
