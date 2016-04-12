import fs from 'fs';
import gulp from 'gulp';
import bg from 'gulp-bg';
import config from './src/config';

// React Native
gulp.task('native', done => {
// native/config.js
    const { appName, database_host, host } = config;
    fs.writeFile('src/app/config.js',
        `/* eslint-disable eol-last, quotes, quote-props */
        export default ${
            JSON.stringify(config, null, 2)
        };
        `
    );
    done();
});

gulp.task('ios', ['native'], bg('react-native', 'run-ios'));
gulp.task('webpack', bg('webpack'));
gulp.task('default',['ios','webpack','watch'], bg('node_modules/.bin/nodemon','./src/server/main.js'));

/**
 * Watch task.
 */
gulp.task('watch', function() {
    gulp.watch('src/config/**', ['native']);
});
