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
  const buildTo = process.argv[3].replace('--', '');

  return gulp
    .src(src)
    .pipe(babel({
      presets: ['react', 'env', 'flow'],
      plugins: [
        'transform-react-jsx-source',
        'transform-object-rest-spread',
        'babel-plugin-styled-components',
      ],
    }))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest(buildTo));
});

gulp.task('watch', () => gulp.watch(src, ['build']));
