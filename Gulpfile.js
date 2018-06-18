const gulp = require('gulp');
const babel = require('gulp-babel');
const { join } = require('path');

const src = [
  '!node_modules',
  '!node_modules/**',
  '!lib/node_modules',
  '!lib/node_modules/**',
  'lib/**/*.js',
];

gulp.task('build', () => {
  const templateDir = process.argv[2].replace('--', '');

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
    .pipe(gulp.dest(join(
      __dirname,
      './templates/runTemplates',
      templateDir,
      'node_modules/@cajacko/lib/dist',
    )));
});

gulp.task('watch', () => gulp.watch(src, ['build']));
