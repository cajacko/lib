const gulp = require('gulp');
const babel = require('gulp-babel');

const src = [
  '!node_modules',
  '!node_modules/**',
  '!lib/node_modules',
  '!lib/node_modules/**',
  'lib/**/*.js',
];

gulp.task('build', () => {
  const buildArg = process.argv[3];
  const buildTo = buildArg && buildArg.replace('--', '');

  const task = gulp
    .src(src)
    .pipe(babel({
      presets: ['react', 'env', 'flow'],
      plugins: [
        'transform-react-jsx-source',
        'transform-object-rest-spread',
        'babel-plugin-styled-components',
      ],
    }))
    .pipe(gulp.dest('dist'));

  if (buildTo) return task.pipe(gulp.dest(buildTo));

  return task;
});

gulp.task('watch', () => gulp.watch(src, ['build']));

gulp.task('buildAndWatch', ['build', 'watch']);
