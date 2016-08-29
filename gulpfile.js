
var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var argv = require('yargs').argv;
var bowerMain = require('bower-main');
var buddy = require('gulp-buddy.js');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var del = require('del');
var eslint = require('gulp-eslint');
var gulpif = require('gulp-if');
var htmlmin = require('gulp-htmlmin');
var ignore = require('gulp-ignore');
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var ngAnnotate = require('gulp-ng-annotate');
var nodemon = require('gulp-nodemon');
var series = require('stream-series');
var uglify = require('gulp-uglify');

var logger = require('./app/util/logger');

(function() {
    'use strict';

    var prod = argv.prod || argv.production;

    // PATHS
    var angularFiles = './public/app/**/*.js';
    var cssFiles = './public/css/*.css';
    var jsFiles = [angularFiles, './config/config.js', './app/**/*.js'];

    var movedFiles = [
        './config/*.js', 'index.js', './app/**/*.js',
        './node_modules/**/*.js', './models/**/*'
    ];
    if(prod) {
        logger.info('Prod Build');
        movedFiles = movedFiles.concat(bowerMain('js', 'min.js').minified);
    } else {
        movedFiles = movedFiles.concat(bowerMain('js', 'min.js').normal);
    }

    var cleanFiles = ['./dist/public/**', './dist/public/index.html'];

    gulp.task('clean', function() {
        return del(cleanFiles);
    });

    gulp.task('move', ['clean'], function() {
        return gulp.src(movedFiles, { base: '.', read: false })
            .pipe(ignore(/gulp/))
            .pipe(changed('dist'))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('html', ['clean'], function() {
        return gulp.src('./public/**/*.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest('./dist/public/'));
    });

    gulp.task('img', ['clean'], function() {
        return gulp.src('./public/img/**/*')
            .pipe(imagemin())
            .pipe(gulp.dest('./dist/public/img/'));
    });

    gulp.task('js', ['hint', 'clean'], function() {
        return gulp.src(angularFiles)
            .pipe(ngAnnotate())
            .pipe(gulpif(prod, uglify()))
            .pipe(gulpif(prod, concat('all.js')))
            .pipe(gulp.dest('./dist/public/app/'));
    });

    gulp.task('css', ['clean'], function() {
        return gulp.src(cssFiles)
            .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
            .pipe(gulpif(prod, cssnano()))
            .pipe(gulpif(prod, concat('all.css')))
            .pipe(gulp.dest('./dist/public/css/'));
    });

    // inject script and link tags
    gulp.task('inject', ['hint', 'move', 'js', 'css', 'html'], function() {
        var css = './dist/public/css/*.css';
        var angular = './dist/public/bower_components/angular/*.js';
        var js = ['./dist/public/**/*.js', '!' + angular];

        var ignorePath = ['dist', 'public'];
        return gulp.src('./public/index.html')
            .pipe(inject(
                gulp.src(css, { read: false }),
                { ignorePath: ignorePath })
            )
            .pipe(inject(
                series(
                    gulp.src(angular, { read: false }),
                    gulp.src(js, { read: false })
                ),
                { ignorePath: ignorePath })
            )
            .pipe(gulp.dest('./dist/public/'));
    });

    // run app files through jshint
    gulp.task('hint', function() {
        return gulp.src(jsFiles)
            .pipe(buddy({ reporter: 'detailed' }))
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    });
    gulp.watch(jsFiles, ['inject']);

    // automatically restart the server if js files change
    gulp.task('start', ['inject', 'move', 'img'], function() {
        var script = 'index.js';
        if(prod) {
            script = './dist/index.js';
        }
        nodemon({
            script: script,
            ext: 'js'
        });
    });

    gulp.task('default', ['start']);
}());
