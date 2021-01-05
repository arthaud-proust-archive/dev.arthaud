const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


// mix.extract();
mix.options({
    purifyCss: false,
    //purifyCss: {},
    postCss: [require('autoprefixer')],
    clearConsole: false,
    cssNano: {
        discardComments: {removeAll: true},
    }
});
mix
    .js('resources/js/app.js', 'public/js')
    .js('resources/js/admin.js', 'public/js')
    .js('resources/js/admin.create.js', 'public/js')
    .js('resources/js/admin.edit.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/mobile-master.scss', 'public/css')
    .sass('resources/sass/mobile-admin.scss', 'public/css')
    .sass('resources/sass/large-master.scss', 'public/css')
    .sass('resources/sass/large-admin.scss', 'public/css');

mix.minify('public/js/app.js');
mix.minify('public/js/admin.js');
mix.minify('public/js/admin.edit.js');
mix.minify('public/js/admin.create.js');