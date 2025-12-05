// File: gulpfile.js
// Smart Workz Premium Admin Template - Build Configuration
// Complete Gulp build system for SCSS compilation, JS bundling, optimization, and development server

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const del = require('del');
const gulpif = require('gulp-if');

// Environment flag
let isProduction = false;

// =============================================================================
// PATH CONFIGURATION
// =============================================================================
const paths = {
  scss: {
    src: 'src/scss/**/*.scss',
    main: 'src/scss/main.scss',
    themes: 'src/scss/themes/*.scss',
    dest: 'dist/css'
  },
  js: {
    src: 'src/js/**/*.js',
    main: 'src/js/app.js',
    modules: 'src/js/modules/**/*.js',
    dest: 'dist/js'
  },
  html: {
    src: 'src/pages/**/*.html',
    components: 'src/components/**/*.html',
    dest: 'dist'
  },
  images: {
    src: 'src/img/**/*',
    dest: 'dist/img'
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'dist/fonts'
  },
  vendors: {
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/bootstrap-icons/font/bootstrap-icons.css'
    ],
    js: [
      'node_modules/@popperjs/core/dist/umd/popper.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/chart.js/dist/chart.umd.js',
      'node_modules/apexcharts/dist/apexcharts.js'
    ],
    fonts: [
      'node_modules/bootstrap-icons/font/fonts/**/*'
    ]
  }
};

// =============================================================================
// ERROR HANDLER
// =============================================================================
const onError = (err) => {
  console.error('Error:', err.message);
  this.emit('end');
};

// =============================================================================
// CLEAN TASK - Remove dist folder
// =============================================================================
function clean() {
  return del(['dist/**', '!dist']);
}

// =============================================================================
// SCSS COMPILATION
// =============================================================================
function styles() {
  return gulp
    .src(paths.scss.main)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(gulpif(!isProduction, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(gulpif(isProduction, cleanCSS({
      level: {
        1: {
          specialComments: 0
        }
      }
    })))
    .pipe(gulpif(isProduction, rename({ suffix: '.min' })))
    .pipe(gulpif(isProduction, gulp.dest(paths.scss.dest)))
    .pipe(browserSync.stream());
}

// =============================================================================
// THEME STYLES - Compile each theme separately
// =============================================================================
function themeStyles() {
  return gulp
    .src(paths.scss.themes)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        cascade: false
      })
    ]))
    .pipe(gulpif(!isProduction, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(gulpif(isProduction, cleanCSS({
      level: {
        1: {
          specialComments: 0
        }
      }
    })))
    .pipe(gulpif(isProduction, rename({ suffix: '.min' })))
    .pipe(gulpif(isProduction, gulp.dest(paths.scss.dest)))
    .pipe(browserSync.stream());
}

// =============================================================================
// VENDOR CSS - Bundle third-party CSS
// =============================================================================
function vendorCSS() {
  return gulp
    .src(paths.vendors.css)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.dest));
}

// =============================================================================
// JAVASCRIPT - Compile and bundle custom JS
// =============================================================================
function scripts() {
  return gulp
    .src([paths.js.main, paths.js.modules])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat('app.js'))
    .pipe(gulpif(!isProduction, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(gulpif(isProduction, terser({
      compress: {
        drop_console: true
      }
    })))
    .pipe(gulpif(isProduction, rename({ suffix: '.min' })))
    .pipe(gulpif(isProduction, gulp.dest(paths.js.dest)))
    .pipe(browserSync.stream());
}

// =============================================================================
// VENDOR JS - Bundle third-party JavaScript
// =============================================================================
function vendorJS() {
  return gulp
    .src(paths.vendors.js)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.js.dest));
}

// =============================================================================
// HTML - Process HTML files with includes
// =============================================================================
function html() {
  return gulp
    .src(paths.html.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        version: require('./package.json').version
      }
    }))
    .pipe(gulpif(isProduction, htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// =============================================================================
// IMAGES - Optimize images
// =============================================================================
function images() {
  return gulp
    .src(paths.images.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulpif(isProduction, imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 85, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      })
    ])))
    .pipe(gulp.dest(paths.images.dest));
}

// =============================================================================
// FONTS - Copy fonts
// =============================================================================
function fonts() {
  return gulp
    .src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

// =============================================================================
// VENDOR FONTS - Copy vendor fonts (Bootstrap Icons)
// =============================================================================
function vendorFonts() {
  return gulp
    .src(paths.vendors.fonts)
    .pipe(gulp.dest('dist/css/fonts'));
}

// =============================================================================
// BROWSER SYNC - Development server
// =============================================================================
function serve(done) {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html'
    },
    port: 3000,
    open: true,
    notify: false
  });
  done();
}

// =============================================================================
// RELOAD - Browser sync reload
// =============================================================================
function reload(done) {
  browserSync.reload();
  done();
}

// =============================================================================
// WATCH - Watch for file changes
// =============================================================================
function watchFiles() {
  gulp.watch(paths.scss.src, styles);
  gulp.watch(paths.scss.themes, themeStyles);
  gulp.watch(paths.js.src, scripts);
  gulp.watch([paths.html.src, paths.html.components], html);
  gulp.watch(paths.images.src, images);
}

// =============================================================================
// SET PRODUCTION MODE
// =============================================================================
function setProduction(done) {
  isProduction = true;
  done();
}

// =============================================================================
// EXPORTED TASKS
// =============================================================================

// Clean task
exports.clean = clean;

// Individual build tasks
exports.styles = styles;
exports.themeStyles = themeStyles;
exports.vendorCSS = vendorCSS;
exports.scripts = scripts;
exports.vendorJS = vendorJS;
exports.html = html;
exports.images = images;
exports.fonts = fonts;
exports.vendorFonts = vendorFonts;

// Development workflow
exports.dev = gulp.series(
  clean,
  gulp.parallel(
    vendorCSS,
    vendorJS,
    vendorFonts,
    styles,
    themeStyles,
    scripts,
    fonts,
    images,
    html
  )
);

// Production build
exports.build = gulp.series(
  setProduction,
  clean,
  gulp.parallel(
    vendorCSS,
    vendorJS,
    vendorFonts,
    styles,
    themeStyles,
    scripts,
    fonts,
    images,
    html
  )
);

// Development server with watch
exports.serve = gulp.series(
  exports.dev,
  serve,
  watchFiles
);

// Watch task (without server)
exports.watch = gulp.series(
  exports.dev,
  watchFiles
);

// Default task
exports.default = exports.serve;
