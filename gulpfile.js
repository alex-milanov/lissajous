'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var bowerFiles = require('main-bower-files')();
var del = require('del');
var livereload  = require('gulp-livereload');
var express = require('express');
var app = express();

var paths = {
	sass: ['./src/sass/**/*.scss'],
	jade: ['./src/jade/**/*.jade'],
	js: ['./src/js/**/*.js'],
	assets: ['./src/assets/**/*.*']
};

gulp.task('sass', function(done) {
	// www
	gulp.src('./src/sass/style.scss')
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest('./dist/css/'))
		.pipe( livereload())
		.on('end',done);
});

gulp.task('jade', function(done) {
	// TODO: get from config
	var YOUR_LOCALS = {};

	gulp.src('./src/jade/**/*.jade')
		.pipe(jade({
			locals: YOUR_LOCALS,
			pretty: true
		}))
		.pipe(gulp.dest('./dist/'))
		.pipe( livereload())
		.on('end',done);
});

gulp.task('assets', function(done) {
	gulp.src('./src/assets/**/*')
		.pipe(gulp.dest('./dist/assets/'))
		.pipe( livereload())
		.on('end',done);
});

gulp.task("bower-files", function(done){
	gulp.src(bowerFiles, { base: './src/lib' })
		.pipe(gulp.dest("./dist/lib"))
		.pipe( livereload())
		.on('end',done);
});

gulp.task('js', function(done) {
	gulp.src('./src/js/**/*.js')
		.pipe( gulp.dest('./dist/js/'))
		.pipe( livereload())
		.on('end',done);
});

gulp.task('express', function() {
	app.use(express.static(path.resolve('./dist')));
	app.use(require('connect-livereload')({
		port: 35729
	}));
	app.listen(8080);
	gutil.log('Listening on port: 8080');
});


gulp.task('livereload', function(){
	livereload.listen({ basePath: './dist' });
});

gulp.task('watch', function() {
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.jade, ['jade']);
	gulp.watch(paths.js, ['js']);
	gulp.watch(paths.assets, ['assets']);
});

gulp.task('build', ['sass','jade','js','assets','bower-files']);

gulp.task('serve', ['express','livereload','watch']);

gulp.task('default',['build','serve']);
