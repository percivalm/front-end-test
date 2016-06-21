/***
 * NOTE: If rebuilding the app for production (via 'gulp build' ).  
 * Go to 'build/public' folder and edit the index.html file. Then, replace 
 *
    <script src="/QueueApp.js"></script>
    <script src="/customer/Customer.js"></script>
    <script src="/add-customer/AddCustomer.js"></script>

    with 

    <script src="/app.min.js"></script>
*
*   That's all.
*
*
*/

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');

var paths = {
  scripts: ['./public/**/*.js', '!./public/bower_components/**/*.js'],
  sass: ['./sass/**/*.scss']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
      .pipe(concat('app.min.js', {newLine:';'}))
      .pipe(ngAnnotate({add:true}))
      .pipe(uglify({mangle:true}))
      .pipe(gulp.dest('./build/public/'));
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



gulp.task('build', ['sass', 'scripts'], function () {
    return gulp.src(['server.js', 'public/**/*.html', 'public/bower_components/**/*.js', 'public/styles/**/*.css'], {base:'./'})
        .pipe(gulp.dest('./build'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['build']);
