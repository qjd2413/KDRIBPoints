
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var eslint = require('gulp-eslint');

(function() {
    'use strict';

    // PATHS
    var bowerFiles = mainBowerFiles('**/*.js');
    var angularFiles = './public/app/**/*.js';
    var serverFiles = './app/**/.*.js';
    var jsFiles = [angularFiles, serverFiles];
    var appFiles = bowerFiles.concat(angularFiles);
    var cssFiles = './public/css/**/*.css';

    // inject script and link tags
    gulp.task('inject', ['hint'], function() {
        return gulp.src('public/index.html')
          .pipe(inject(gulp.src(appFiles), { relative: true }))
          .pipe(inject(gulp.src(cssFiles), { relative: true }))
          .pipe(gulp.dest('./public/'));
    });

    // run app files through jshint
    gulp.task('hint', function() {
        return gulp.src(jsFiles)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });

    // automatically restart the server if js files change
    gulp.task('start', ['inject'], function() {
        nodemon({
            script: 'index.js',
            ext: 'js'
        });
    });

    gulp.task('default', ['start']);
}());
