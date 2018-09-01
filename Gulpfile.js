const gulp = require('gulp');
const babel = require('gulp-babel');

const ignore = ['!node_modules', '!node_modules/**'];

const js = ['src/**/*.js'];

const json = ['src/**/*.json'];

const watch = ignore.concat(js, json);
const babelSrc = ignore.concat(js);
const jsonSrc = ignore.concat(json);

const dest = './';

const getBuildTo = () => {
  if (!process.argv[3]) return null;

  const buildPaths = process.argv.slice();

  buildPaths.splice(0, 3);

  return buildPaths.map(path => `${path.replace('--', '')}`);
};

gulp.task('copyJSON', () => {
  const buildTo = getBuildTo();

  const task = gulp.src(jsonSrc).pipe(gulp.dest(dest));

  if (buildTo && buildTo.length) {
    buildTo.forEach((buildPath) => {
      task.pipe(gulp.dest(buildPath));
    });

    return task;
  }

  return task;
});

gulp.task('build', ['copyJSON'], () => {
  const buildTo = getBuildTo();

  const task = gulp
    .src(babelSrc)
    .pipe(babel({
      presets: ['react', 'env', 'flow'],
      plugins: [
        'transform-react-jsx-source',
        'transform-object-rest-spread',
        'babel-plugin-styled-components',
      ],
    }))
    .pipe(gulp.dest(dest));

  if (buildTo && buildTo.length) {
    buildTo.forEach((buildPath) => {
      task.pipe(gulp.dest(buildPath));
    });

    return task;
  }

  return task;
});

gulp.task('watch', () => gulp.watch(watch, ['build']));

gulp.task('buildAndWatch', ['build', 'watch']);
