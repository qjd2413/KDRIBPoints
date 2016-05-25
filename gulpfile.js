'use strict';

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mainBowerFiles = require('main-bower-files'),
    inject = require('gulp-inject');

var jsFiles = mainBowerFiles('**/*.js');
var appFiles = './public/app/**/*.js';
jsFiles.push(appFiles);

gulp.task('inject', function() {
  return gulp.src('public/index.html')
    .pipe(inject(gulp.src(jsFiles),
      {relative: true}))
    .pipe(gulp.dest('./public/'));
});

// automatically restart the server if js files change
gulp.task('start', function () {
  nodemon({
    script: 'index.js',
    ext: 'js'
  }).on('restart', function () {
    setTimeout(function () {

    }, 500);
  });
});

gulp.task('default', [
    'start',
    'inject'
]);
