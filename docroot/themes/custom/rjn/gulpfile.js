var gulp = require('gulp');

/**
 * Look at package.json and load dependencies
 **/
var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}

var today = new Date(),
    h = checkTime(today.getHours()),
    m = checkTime(today.getMinutes()),
    s = checkTime(today.getSeconds());

/**
 * Important project paths
 **/
var scssPath = "sass/**/*.scss";
var scssPathDir = "sass";
var cssDest = "css";
var cssMapDest = "/";

var jsPath = "js/script.js";
var jsDest = "js/min/";

var imgPath = "images/src/*";
var imgDest = "images/";

var svgPath = "svg/src/**/*.svg";
var svgDest = "svg";
var svgGlob = "**/*.svg";
var htmlPath = "html/*";

/**
 * SASS compilation + minification + sourcemaps
 **/
gulp.task('sass', () => {
    gulp.src(scssPath)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ['> 1%',
                'last 2 versions',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'IE 10',
                'IE 11'],
            cascade: false
        }))
        .pipe(plugins.cssnano())
        .pipe(plugins.sourcemaps.write(cssMapDest))
        .pipe(gulp.dest(cssDest))
        .pipe(plugins.livereload());

});


/**
 * JS error handling
 **/
/*
gulp.task('jshint', () => {
    return gulp.src(jsPath)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(jsDest))
        .pipe(plugins.livereload());
});
*/


const babel = require('gulp-babel');

gulp.task('jshint', () => {
    return gulp.src(jsPath)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(jsDest))
        .pipe(plugins.livereload());
});

/**
 * Livereload for HTML
 * PROCESS HEAVY
 **/
gulp.task('html', () => {
    return gulp.src(htmlPath)
        .pipe(plugins.livereload());
});


/**
 * Compress jpg/png files using TINYPNG
 * Please register at TinyPNG.org for an API key
 * Compress SVG files using imagemin
 * DO NOT USE AS A WATCH TASK - PROCESS HEAVY
 **/

gulp.task('crush', () => {

    return gulp.src(imgPath)
        .pipe(plugins.tinypngCompress({
            key: 'gw3Lhq1szlO_Txpk8gh9ATIsQPbjNXkl',
            sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest(imgDest));
});
gulp.task('crush-svg', () => {

    return gulp.src(svgPath)
        .pipe(plugins.svgmin(function getOptions (file){
            var name = file.relative;
            console.log('['+h+':'+m+':'+s+'] '+ 'Compressing SVG: ' + name);
            return {
                plugins: [{
                    removeDoctype: false
                }, {
                    removeComments: true
                }, {
                    cleanupNumericValues: {
                        floatPrecision: 2
                    }
                }, {
                    convertColors: {
                        names2hex: false,
                        rgb2hex: false
                    }
                }, {
                    verbose: true
                }]
            }

        }))
        .pipe(gulp.dest(svgDest));
});

/**
 * Watch folders for changes
 **/
gulp.task('watch', () => {
    plugins.livereload.listen();
    gulp.watch(scssPath, ['sass']);
    gulp.watch(jsPath, ['jshint']);
    gulp.watch(htmlPath, ['html']);

});


/**
 * Testing sprite creation
 **/

config = {
    "dest": "svg",
    "mode": {
        "css": {
            "dest": "sass",
            "sprite": "svg/sprite.svg",
            "render": {
                "scss": {
                    "dest": "sass"
                }
            }
        }
    }
};

var outDir = 'svg',     // <-- Main output directory
    config = {
        "dest": "svg",
        "log": "info",
        "mode": {
            "css": {
                "dest": "sprite",
                "common": "svg-sprite",
                "prefix": ".svg-sprite__",
                "sprite": "sprite",
                "dimensions": "-dims",
                "bust": false,
                "render": {
                    "scss": {}
                }
            }
        }
    };

gulp.task('svgsprite', () => {
    return gulp.src(svgGlob, {cwd: svgDest})
        .pipe(plugins.plumber())
        .pipe(plugins.svgSprite(config)).on('error', function (error) {
            console.log(error);
        })
        .pipe(gulp.dest(outDir))
});

gulp.task('default', () => {
    console.log("To install - run $ npm install followed by $ gulp watch");
});

