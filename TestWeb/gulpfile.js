var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('minjs', function () {
    return gulp.src('frame/js/*.js')
        .pipe(jshint)
        .pipe(gulp.dest('build/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify)
        .pipe(gulp.dest('build/js'));
});

gulp.task('mincss', function () {
    return gulp.src('frame/css/*.css')
        .pipe(autoprefixer('last 2 version', 'ie10', 'ie11', 'safari 5', 'ios 6', 'android 4'))
        .pipe(gulp.dest('build/css'))
        .pipe(rename({suffix:'.min'}))
        .pipe(minifyCss)
        .pipe(gulp.dest('build/css'));
});