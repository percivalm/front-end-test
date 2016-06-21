var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var del = require('del');

var paths = {
  scripts: ['public/**/*.js', '!public/bower_components/**/*.js'],
  sass: ['./sass/**/*.scss']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
      .pipe(uglify())
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest('./build'));
});

gulp.task('sass', function() {
  
  return gulp.src(paths.sass)
            .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest('./public/styles'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sass, ['sass']);
});



// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts']);
