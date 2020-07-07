let gulp = require("gulp");
let pug = require("gulp-pug");
let sass = require("gulp-sass");
let concat = require("gulp-concat");
let minify = require("gulp-minify");
let prefixer = require("gulp-autoprefixer");
let livereload = require("gulp-livereload");
let sourcemaps = require("gulp-sourcemaps");
const gulpLivereload = require("gulp-livereload");

// Html Task
gulp.task('html', ()=>{
  return gulp.src('stage/html/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dist'))
    .pipe(livereload())
})

// css task
gulp.task('css',()=>{
  return gulp
    .src(["stage/css/**/*.css", "stage/css/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(prefixer())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload());
})

// js task
gulp.task('js', ()=>{
  return gulp.src('stage/js/*.js')
    .pipe(concat('main.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload())
})

// Watch task
gulp.task('watch',()=>{
  require('./server');
  livereload.listen();
  gulp.watch('stage/html/**/*.pug', ['html']);
  gulp.watch(["stage/css/**/*.css", "stage/css/**/*.scss"], ['css']);
  gulp.watch('stage/js/*.js', ['js']);
});


