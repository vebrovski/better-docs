const DOCS_COMMAND = process.env.DOCS_COMMAND || 'yarn docs'
const DOCS_OUTPUT = process.env.DOCS_OUTPUT || '../docs'

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const run = require('gulp-run')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const path = require('path')
const browserSync = require('browser-sync').create()

function styles() {
  return gulp.src('styles/app.sass')
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('static/styles'))
}
exports.styles = styles

function scripts() {
  return gulp.src(path.join('scripts/', '*.js'), { base: 'app' })
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('static/scripts'))
}
exports.scripts = scripts

function docs() {
  return run(`${DOCS_COMMAND}`).exec()
}
exports.docs = docs

function watch() {
  gulp.watch('styles/**/*.sass', gulp.series(styles, docs))
  gulp.watch('scripts/**/*.js', gulp.series(scripts, docs))
  gulp.watch('tmpl/**/*.tmpl', gulp.series(docs))
  gulp.watch('publish.js', gulp.series(docs))
  if (process.env.DOCS) {
    const array = [
      ...process.env.DOCS.split(','),
      ...process.env.DOCS.split(',').map(src => '!' + src.replace('**/*', 'node_modules/**/*'))
    ]
    console.log(array)
    gulp.watch(array, gulp.series(docs))
  }
}
exports.watch = watch

function sync() {
  browserSync.init({
    server: {
      baseDir: DOCS_OUTPUT
    }
  })
  gulp.watch(`${DOCS_OUTPUT}/*`).on('change', browserSync.reload)
}
exports.sync = sync

exports.default = gulp.parallel(styles, scripts, docs, watch, sync)
