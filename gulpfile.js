const gulp = require('gulp');
const rename = require("gulp-rename");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const $ = require('gulp-load-plugins')();
const electron = require('electron-connect').server.create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const ejs = require( 'gulp-ejs' );

// es6ファイルのコンパイル
gulp.task('es6', () => {
    browserify({entries: ["./src/es6/main.es6"]})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("./dist/js"));
});

// htmlファイルコピー
gulp.task('html', () => {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest("./dist"));
});

// ejsファイルのコンパイル
gulp.task("ejs", () => {
    gulp.src(['./src/**/*.ejs', '!./src/**/_*.ejs'])
        .pipe(ejs())
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest("./dist"))
});

// ライブラリコピー
gulp.task('lib', () => {
    gulp.src('./src/lib/**/*')
        .pipe(gulp.dest("./dist"));
});

// Sassファイルのコンパイル
gulp.task('sass', () => {
  gulp.src(['./src/sass/**/*.scss', '!./src/sass/**/_*.scss'])
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./dist/css'));
});

// コンパイルしてElectron起動
gulp.task('start', ['es6', 'ejs', 'sass', 'lib'], () => {
  electron.start();
  gulp.watch('src/**/*.es6', ['es6']);
  gulp.watch('src/**/*.ejs', ['ejs']);
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch('src/lib/**/*', ['lib']);
  gulp.watch(['electron.js'], electron.restart);
  gulp.watch(['dist/**/*'], electron.reload);
});