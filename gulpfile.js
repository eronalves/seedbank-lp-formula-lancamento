var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var concat = require('gulp-concat');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/creative.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
                     'node_modules/magnific-popup/dist/magnific-popup.css',
                     'css/creative.css',                    
                     'bower_components/sweetalert/dist/sweetalert.css'])
        .pipe(concat('creative.min.css'))             
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
// gulp.task('minify-js', function() {
//     return gulp.src('js/creative.js')
//         .pipe(uglify())
//         .pipe(header(banner, { pkg: pkg }))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('js'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });

gulp.task('minify-js', function() {
  gulp.src(['node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'js/jquery-easing/jquery.easing.min.js',
            'node_modules/scrollreveal/dist/scrollreveal.min.js',
            'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
            'js/creative.js',

            'bower_components/angular/angular.min.js', 
            'bower_components/sweetalert/dist/sweetalert.min.js',
            'bower_components/ngSweetAlert/SweetAlert.min.js', 
            'js/app/app.js',
            'js/app/service/mailchimp-service.js',
            'js/app/controller/controller.js'])
    .pipe(concat('seedbank.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
})

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
