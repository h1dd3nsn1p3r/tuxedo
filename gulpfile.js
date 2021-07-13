// Gulp file to compile Tuxedo SCSS & JS files

const gulp = require('gulp');
const zip = require('gulp-zip');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rtlcss = require('gulp-rtlcss');
const rename = require('gulp-rename');
const shell = require('gulp-shell');

/*
*
# npm update
# npm init
# npm install gulp gulp-zip gulp-sourcemaps gulp-sass gulp-concat gulp-uglify gulp-postcss autoprefixer cssnano gulp-replace gulp-notify gulp-plumber gulp-rtlcss gulp-rename gulp-shell -g
# npm install gulp gulp-zip gulp-sourcemaps gulp-sass gulp-concat gulp-uglify gulp-postcss autoprefixer cssnano gulp-replace gulp-notify gulp-plumber gulp-rtlcss gulp-rename gulp-shell --save-dev
*
*/

/*
===========================================================
=
= Change these constants according to your need
=
====================================================
*/

// #1 Script files path
const scriptpath = {

    script_src: [
        './assets/src/js/*.js',
        '!./assets/src/js/*.min.js',
    ],
    script_dist: "./assets/build/js/",
}

// 2# SASS/SCSS file path
const sasspath = {

    sass_src: ["./assets/src/scss/**/*.scss"],
    sass_dist: "./assets/build/css/",
}
const compiled_sass_css_file_name = "tuxedo-public.min.css"; // what would you like to name your compiled CSS file

// #3 zips production ready files
const output_filename = 'tuxido-production.zip';

const files_folders = {

    filefolders_src: [

        // select all files & folders
        './*',
        './*/**',

        // build tools
        '!./.git',
        '!./.gitignore',
        '!./node_modules/**',
        '!./gulpfile.js',
        '!./package.json',
        '!./package-lock.json',
        '!./composer.json',
        '!./composer.lock',
        '!./sftp-config.json',

        // source files
        '!./assets/src/scss/**',
        '!./assets/src/js/**',
    ],

    production_zip_file_path: "./",
}

/*
===========================================================
=
= Define task (Almost no changes required)
=
====================================================
*/


gulp.task('scriptsTask', function () {
    return gulp.src(scriptpath.script_src)
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(scriptpath.script_dist));
});

gulp.task('sassTask', function () {
    var onError = function (err) {
        notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "Error: <%= error.message %>",
            sound: "Beep"
        })(err);
        this.emit('end');
    };
    return gulp.src(sasspath.sass_src)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([autoprefixer('last 2 version'), cssnano()])) // PostCSS plugins
        .pipe(concat(compiled_sass_css_file_name))
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(gulp.dest(sasspath.sass_dist)); // put final CSS in dist folder
});

gulp.task('ZipProductionFiles', function () {
    return gulp.src(files_folders.filefolders_src)
        .pipe(zip(output_filename))
        .pipe(gulp.dest(files_folders.production_zip_file_path))
});


//=========================================
// = C O M M A N D S                      = 
//=========================================
//
// 1. Command: gulp (will compile static resources)
// 2. Command: gulp zipprod (will generate production ready files)
//
//=========================================

// Task 1 & 2: compiles static assets
gulp.task('default', gulp.series('scriptsTask', 'sassTask', (done) => {
    gulp.watch(scriptpath.script_src, gulp.series('scriptsTask'));
    gulp.watch(sasspath.sass_src, gulp.series('sassTask'));
    done();
}));

// Task 3: zip production files
gulp.task('zipprod', gulp.series('ZipProductionFiles', (done) => {
    done();
}));