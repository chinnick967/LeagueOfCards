const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const sass = require('gulp-sass');

const config = {
	test: {
		src: 'test/**/*.js'
	},
	sass: {
		src: 'src/css/index.scss',
		dest: 'src/'
	}
};

gulp.task('test', function () {
	gulp.watch(config.test.src, function () {
		return gulp.src(config.test.src)
			.pipe(jasmine());
	});
});

gulp.task('sass', function () {
	return gulp.src(config.sass.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.sass.dest))
});

gulp.task('build', ['sass']);

gulp.task('default', function () {
	gulp.watch(config.sass.src, ['sass']);
});