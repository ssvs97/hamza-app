const gulp = require("gulp"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer");

gulp.task("css", () => {
  const plugin = [autoprefixer()];
  return gulp
    .src("./views/css/*.css")
    .pipe(postcss(plugin))
    .pipe(gulp.dest("./views/vendor"));
});

gulp.task("serve", gulp.series("css"), () => {
  gulp.watch("./views/css/*.css", gulp.parallel("css"));
});

gulp.task("default", gulp.series("serve"));
