const gulp = require('gulp');
const jasmine = require('gulp-jasmine');


gulp.task('test', function () {
	gulp.watch(['test/**/*.js'], function () {
		return gulp.src('test/**/*.js')
			.pipe(jasmine());
	});
});