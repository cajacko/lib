const gulp = require('gulp');
const babel = require('gulp-babel');

const ignore = [
  '!node_modules',
  '!node_modules/**',
  '!lib/node_modules',
  '!lib/node_modules/**',
];

const js = ['lib/**/*.js'];

const json = ['lib/**/*.json'];

const watch = ignore.concat(js, json);
const babelSrc = ignore.concat(js);
const jsonSrc = ignore.concat(json);

const dest = 'dist';

const getBuildTo = () => {
  const buildArg = process.argv[3];
  return buildArg && buildArg.replace('--', '');
};

gulp.task('copyJSON', () => {
  const buildTo = getBuildTo();

  const task = gulp.src(jsonSrc).pipe(gulp.dest(dest));

  if (buildTo) return task.pipe(gulp.dest(buildTo));

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

  if (buildTo) return task.pipe(gulp.dest(buildTo));

  return task;
});

gulp.task('watch', () => gulp.watch(watch, ['build']));

gulp.task('buildAndWatch', ['build', 'watch']);
