var sass = require('gulp-sass');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var process = require('child_process');
var changed = require('gulp-changed');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var rev = require('gulp-rev');


gulp.task('serve', ['scssToCss', 'tsc'], function () {
  browserSync.init({
    server: "./"
  });
  gulp.watch("./src/sass/**/*.scss", ['scssToCss']);
  gulp.watch("./src/js/**/*.ts", ['tsc']);
  gulp.watch("./src/js/**/*.js").on('change', reload);
  gulp.watch("./src/html/**/*.html").on('change', reload);
});

gulp.task('scssToCss', function () {
  return gulp.src(['./src/sass/**/*.scss', './src/sass/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest/css/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('tsc:build', function() {
  process.exec('rm -rf public', function (err, stdout, stderr) {
    if (err) console.error(err);
  });
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({stream: true}));
})

gulp.task('tsc', function () {
  return gulp.src('./src/js/**/*.ts')
    .pipe(changed('./public', { extension: '.js' }))
    .pipe(tsProject())
    .js.pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['serve']); //默认任务


gulp.task('build:testjs', function () {
  // js的源路径
  return gulp.src('./src/js/Apr1/*.js')
    .pipe(rev())
    // js的输出目标路径
    .pipe(gulp.dest('./public/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./public/'))
});