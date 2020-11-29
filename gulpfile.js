const { dest, series, src } = require('gulp');
const babel  = require('gulp-babel');
const del    = require('del');
const pump   = require('pump');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

exports.default = series(() => del(['js/livesearch.min.js'], { force: true }), cb => pump([
    src(['js/livesearch.js']),
    babel({ presets: ['@babel/env'] }),
    uglify(),
    rename({ suffix: '.min' }),
    dest('js')
], cb));
