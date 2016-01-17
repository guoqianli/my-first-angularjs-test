/**
 * 初始化
 * npm install gulp-util gulp-imagemin gulp-sass gulp-minify-css gulp-uglify gulp-rename gulp-concat gulp-clean gulp-clean tiny-lr --save-dev
 */

// 引入 gulp及组件
var gulp = require('gulp'),                 //基础库
    imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-sass'),          //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    //jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    connect = require('gulp-connect'),
    del = require('del'),
    livereload = require('gulp-livereload');   //livereload
    var paths = {
        src : 'dist/'
    };
// HTML处理
gulp.task('html',['clean'], function() {
    var htmlSrc = 'app/**/*.html',
        htmlDst = 'dist/';

    return gulp.src(htmlSrc)
        .pipe(livereload(true))
        .pipe(gulp.dest(htmlDst))
});

// 样式处理
gulp.task('css',['clean'], function () {
    var cssSrc = 'app/scss/**/*.scss',
        cssDst = 'dist/css';

    return gulp.src(cssSrc)
        .pipe(sass({ style: 'expanded'}))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(true))
        .pipe(gulp.dest(cssDst));
});

// 图片处理
gulp.task('images',['clean'], function(){
    var imgSrc = 'app/images/**/*',
        imgDst = 'dist/images';
    return gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(livereload(true))
        .pipe(gulp.dest(imgDst));
})


// js处理
gulp.task('js',['clean'],function(){
    var appSrc = 'app/js/**/*.js',
        appDst = 'dist/js/';

    return gulp.src(appSrc)
        .pipe(uglify())
        //.pipe(concat("vendor.js"))
        .pipe(gulp.dest(appDst))
        .pipe(livereload(true));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    return del(['dist']);
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['watch','html','css','images','js']);

/**
 * 本地静态服务器 http://localhost:8080
 */
gulp.task('connect', function() {
    connect.server({
        root: paths.src,
        livereload: true
    });
});
gulp.task('reload-html', function () {
    gulp.src([paths.src+'*.htm', paths.src+'*.html'])
        .pipe(connect.reload());
});
gulp.task('watch-file', function () {
    gulp.watch([paths.src+'*.htm', paths.src+'*.html'], ['reload-html']);
});
gulp.task('watch',['connect', 'watch-file','html','css','images','js']);
