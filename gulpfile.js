var gulp         = require('gulp'),
    scss         = require('gulp-sass'),
    cleanCSS     = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    notify       = require("gulp-notify");

gulp.task('scss', function() {
  return gulp.src('src/style.scss')
    .pipe(scss({outputStyle: 'expanded'}).on("error", notify.onError()))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function() {
  gulp.watch('src/style.scss', gulp.parallel('scss'));
});

gulp.task('default', gulp.parallel('scss', 'watch'));