var sass = require('gulp-sass');
var gulp = require('gulp');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var fs=require('fs');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

  gulp.task('serve', ['scssToCss'], function() {
      browserSync.init({
          server: "./"
      });
      gulp.watch("./src/sass/**/*.scss", ['scssToCss']);
      gulp.watch("./src/js/**/*.js").on('change', reload);
      gulp.watch("./src/html/**/*.html").on('change', reload);
  });

  gulp.task('scssToCss', function () {
      return gulp.src(['./src/sass/**/*.scss','./src/sass/*.scss'])
          .pipe(sourcemaps.init())
          .pipe(sass().on('error', sass.logError))
          .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('./dest/css/'))
          .pipe(browserSync.reload({stream: true}));
  });
  gulp.task('default', ['serve']); //默认任务
