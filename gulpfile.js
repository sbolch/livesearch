let gulp    = require('gulp');
let babel   = require('gulp-babel');
let del     = require('del');
let pump    = require('pump');
let rename  = require('gulp-rename');
let uglify  = require('gulp-uglify');

gulp.task('clean', function(cb) {
    return del(['js/livesearch.min.js'], cb);
});

gulp.task('default', ['clean'], function() {
    pump([
        gulp.src(['js/livesearch.js']),
        babel({ presets: ['env'] }),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('js')
    ]);
});