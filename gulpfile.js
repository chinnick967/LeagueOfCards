const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const run = require('run-sequence');
const watch = require('gulp-watch');
const through2 = require('through2');
const uglify = require('gulp-uglify');



var isProd = false;


const config = {
	test: {
		src: 'test/**/*.js'
	},
	sass: {
		src: 'src/css/index.scss',
		dest: 'src/'
	},
	scripts: {
		src: ['./scripts.config'].concat(require('./scripts.config')),
		dest: 'src/'
	}
};

gulp.task('test', function () {
	gulp.watch(config.test.src, function () {
		return gulp.src(config.test.src)
			.pipe(jasmine());
	});
});

gulp.task('scripts', function () {
	
	return gulp.src(config.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(gulpIf(isProd, babel({presets: ['es2015']})))
		.pipe(concat('bundle.js'))
		.pipe(wrapIIFE())

		.pipe(gulpIf(isProd, uglify({
			mangle: true
		})))
		.on('error', function () {
			console.log(arguments);
		})

		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.scripts.dest));
});

gulp.task('sass', function () {
	return gulp.src(config.sass.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.sass.dest))
});

gulp.task('build', ['sass', 'scripts']);

gulp.task('default', ['build'], function () {
	watch(['./src/css/*.scss'], function () {
		run('sass');
	});
	watch(['./scripts.config.js', './src/Engine/**/*.js', './src/vendor/*.js'], () => {
		console.log ('here');
		
	    run('scripts');
	});
});

gulp.task('prod', function () {
	isProd = true;
	run('build');
});

function wrapIIFE () {
	return through2.obj(function (chunk, enc, callback) {
		var str = chunk.contents.toString();
		var res = '(function () {' + str.trim().replace(/^"use strict";/g, '') + '}());';
		chunk.contents = new Buffer(res);
		this.push(chunk);
		return callback();
	})
}