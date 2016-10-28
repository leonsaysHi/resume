var gulp = require('gulp');
var sass = require('gulp-sass');
var copy = require('copy');
var browserSync = require('browser-sync');

var paths = {
  foundicons: './bower_components/foundation-icons/',
  sources_sass: './sources/stylesheets/**/*.scss',
  sources_html: './sources/html/**/*.html',
  www: './www/'
};

gulp.task('sass', function () {
  return gulp.src(paths.sources_sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.www));
});

gulp.task('fonts', function() {
    return gulp.src([paths.foundicons+'foundation_icons_general/fonts/*', paths.foundicons+'foundation_icons_social/fonts/*'])
      .pipe(gulp.dest(paths.www+'fonts'));
});

gulp.task('html', function() {
    return gulp.src([paths.sources_html])
      .pipe(gulp.dest(paths.www));
});

gulp.task('watch', function() {
    gulp.watch(paths.sources_sass, ['sass']);
    gulp.watch(paths.sources_html, ['html']);
});

gulp.task('serve', function() {
    browserSync.init({
      server: paths.www
    });
    gulp.watch([paths.www + '*.css', paths.www + '*.html'], []).on('change', browserSync.reload);
});



// The default task (called when you run `gulp` from cli)
gulp.task('default', ['fonts', 'html', 'watch', 'serve']);
