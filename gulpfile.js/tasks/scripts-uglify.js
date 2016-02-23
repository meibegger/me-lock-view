var gulp = require('gulp')
  , plumber = require('gulp-plumber')
  , uglify = require('gulp-uglify')
  , rename = require('gulp-rename')
  , header = require('gulp-header')
  , pkg = require('../../package.json')
  , config = require('../config.json')
  , banner = config.scripts.banner || []
  ;

gulp.task('scripts-uglify', function() {
  gulp.src(config.scripts.uglify.src)
    .pipe(plumber())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(header(banner.join('\n'), { pkg : pkg } ))
    .pipe(gulp.dest(config.scripts.dest));
});
