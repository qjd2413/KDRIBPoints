
(function() {
    'use strict';

    var gulp = require('gulp');
    var nodemon = require('gulp-nodemon');
    var mainBowerFiles = require('main-bower-files');
    var inject = require('gulp-inject');
    var jshint = require('gulp-jshint');
    var stylish = require('jshint-stylish');

    //PATHS
    var jsFiles = mainBowerFiles('**/*.js');
    var appFiles = './public/app/**/*.js';
    jsFiles.push(appFiles);
    var cssFiles = './public/css/**/*.css';

    //inject script and link tags
    gulp.task('inject', ['hint'], function() {
        return gulp.src('public/index.html')
          .pipe(inject(gulp.src(jsFiles),   //inject angular and bower js files
              {relative: true}))            //only read filenames, not content
          .pipe(inject(gulp.src(cssFiles),
              {relative: true}))
          .pipe(gulp.dest('./public/'));
    });

    //run app files through jshint
    gulp.task('hint', function() {
        return gulp.src(appFiles)
            .pipe(jshint())
            .pipe(jshint.reporter(stylish));
    });

    // automatically restart the server if js files change
    gulp.task('start', function () {
        nodemon({                           //start server
            script: 'index.js',
            ext: 'js'
        }).on('restart', function () {      //wait .5s on restart
            setTimeout(function () {}, 500);
        });
    });

    gulp.task('default', [
        'start',
        'inject'
    ]);

})();
