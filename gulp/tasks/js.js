var gulp = require('gulp');
var include = require("gulp-include");
var uglify = require('gulp-uglify');
var config = require('../config');
var browserSync = require('browser-sync');
reload = browserSync.reload;
var rename = require('gulp-rename');

gulp.task('js', function () {
    gulp.src(config.src.js+'*.js')
        .pipe(include())
        .on('error', function(){notify("Javascript include error");})        
        // .pipe(gulp.dest(config.dest.js))        
        .pipe(uglify())
        // .pipe(rename({
        // 	suffix: '.min'
        // }))
        .pipe(gulp.dest(config.dest.js))
        .pipe(reload({stream: true}));
});

gulp.task('js:watch', function() {
    gulp.watch(config.src.js+'*', ['js']);
});