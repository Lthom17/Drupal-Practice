const gulp = require("gulp"),
  // sass = require("gulp-sass")(require('sass')),
  glob = require("gulp-sass-glob"),
  watch = require("gulp-watch"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("autoprefixer"),
  postcss = require("gulp-postcss");
const browserSync = require('browser-sync').create();
const url = 'drupal-practice.ddev.site';
const babel = require("gulp-babel");
const terser = require("gulp-terser");


gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: url,
    host: url,
    port: 3000,
  });
});

gulp.task("reactCompile", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel()) // No need to pass presets here
    .pipe(terser())
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("assets/js"))
    .pipe(browserSync.stream());
});


// gulp.task("sassCompile", function() {
//   return gulp
//     .src("./src/sass/**/*.scss")
//     .pipe(sourcemaps.init())
//     .pipe(glob())
//     .pipe(
//       sass({
//         noCache: true,
//         outputStyle: "compressed",
//         lineNumbers: false,
//         loadPath: "./assets/css/*",
//         sourceMap: true
//       }).on('error', sass.logError)
//     )
//     .pipe(postcss([autoprefixer()]))
//     .pipe(sourcemaps.write("./maps"))
//     .pipe(gulp.dest("./assets/css"))
//     .pipe(browserSync.stream());
// });

gulp.task("watch", function() {
  gulp.watch(["src/js/**/*.js"], gulp.series("reactCompile"));

  // gulp.watch(["src/sass/**/*.scss"], gulp.series("sassCompile"));
});

gulp.task("build", gulp.series("reactCompile"));

gulp.task('default', gulp.series('watch'));
