var gulp = require('gulp'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    browserSync = require('browser-sync').create();

gulp.task('inky', function() {
  return gulp.src('templates/*.html')
  .pipe(inky())
  .pipe(gulp.dest('./'))
})

gulp.task('inline', function() {
    return gulp.src('./*.html')
      .pipe(inlineCss({
        applyStyleTags: true,
        applyLinkTags: true,
        removeStyleTags: true,
        removeLinkTags: true
      }))
      .pipe(gulp.dest('build/'));
});

gulp.task('serve', ['inky', 'inline'], function() {
  browserSync.init({
    server: './'
  })
  gulp.watch('*templates/*.html', ['inky'])
  gulp.watch('./*.html', ['inline'])
  gulp.watch('build/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['serve'])
