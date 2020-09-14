var gulp         = require('gulp'),
    scss         = require('gulp-sass'),
    cleanCSS     = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    notify       = require("gulp-notify"),
    browserSync  = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    notify: false,
    open: false
  })
});

gulp.task('scss', function() {
  return gulp.src('src/style.scss')
    .pipe(scss({outputStyle: 'expanded'}).on("error", notify.onError()))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
});

gulp.task('html', function() {
  return gulp.src('./*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('./*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));