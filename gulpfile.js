const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const { series } = require('gulp');
const eslint = require('gulp-eslint');
const scsslint = require('gulp-scss-lint');
// Task to compile sass
gulp.task('compileSass', async function() {
    gulp.src(['sass/*'])
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('css/'))
});

// scss linting.
gulp.task('scss-lint', function() {
  return gulp.src('/sass/*.scss')
    .pipe(scsslint());
});

gulp.task('compress', async function() {
    gulp.src(['scripts/*.js'])
      .pipe(minify())
      .pipe(gulp.dest('js'))
  });

// Check js lint.
gulp.task('jsLint', function(){
	return gulp.src(['scripts/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// It's going to watch all scss files and.
// run task compileSass for any changes.
gulp.task('watch', async function() {
     gulp.watch('sass/*.scss', gulp.series('compileSass'));
     gulp.watch('scripts/*.js', gulp.series('compress'));
});

gulp.task('default', series('scss-lint', 'compileSass', 'jsLint', 'compress'));

