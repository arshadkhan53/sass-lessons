const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const { series } = require('gulp');


// Task to compile sass
gulp.task('compileSass', async function() {
    gulp.src(['sass/*'])
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('css/'))
});

gulp.task('compress', async function() {
    gulp.src(['scripts/*.js'])
      .pipe(minify())
      .pipe(gulp.dest('js'))
  });

// It's going to watch all scss files and.
// run task compileSass for any changes.
gulp.task('watch', async function() {
     gulp.watch('sass/*.scss', gulp.series('compileSass'));
     gulp.watch('scripts/*.js', gulp.series('compress'));
});

gulp.task('default', series('compileSass', 'compress'));

