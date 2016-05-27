
(function() {
    'use strict';

    var gulp = require('gulp');
    var nodemon = require('gulp-nodemon');
    var mainBowerFiles = require('main-bower-files');
    var inject = require('gulp-inject');
    var jshint = require('gulp-jshint');
    var stylish = require('jshint-stylish');

    //PATHS
    var bowerFiles = mainBowerFiles('**/*.js');
    var angularFiles = './public/app/**/*.js';
    var serverFiles = './app/**/.*.js';
    var jsFiles = angularFiles.concat(serverFiles);
    var appFiles = bowerFiles.concat(angularFiles);
    var cssFiles = './public/css/**/*.css';

    //inject script and link tags
    gulp.task('inject', ['hint'], function() {
        return gulp.src('public/index.html')
          .pipe(inject(gulp.src(appFiles),   //inject angular and bower js files
              {relative: true}))            //only read filenames, not content
          .pipe(inject(gulp.src(cssFiles),
              {relative: true}))
          .pipe(gulp.dest('./public/'));
    });

    //run app files through jshint
    gulp.task('hint', function() {
        return gulp.src(jsFiles)
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
