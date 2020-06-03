'use strict'

import { paths } from '../gulpfile.babel'
import gulp from 'gulp'
import browsersync from 'browser-sync'
import debug from 'gulp-debug'
import yargs from 'yargs'

const webpackConfig = require('../webpack.config.js'),
    argv = yargs.argv,
    production = !!argv.production

webpackConfig.mode = production ? 'production' : 'development'

gulp.task('mock', () => {
    return gulp
        .src(paths.mock.src)
        .pipe(gulp.dest(paths.mock.dist))
        .pipe(
            debug({
                title: 'MOCK JS files'
            })
        )
        .on('end', browsersync.reload)
})
