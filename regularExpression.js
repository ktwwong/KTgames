/**
 * About the regular Expression, you can read more about it at:
 * https://atedev.wordpress.com/2007/11/23/%E6%AD%A3%E8%A6%8F%E8%A1%A8%E7%A4%BA%E5%BC%8F-regular-expression/
 * This is a good practice that learn how to avoid the target character you need, 
 * instead of put every word into you regular expression test,
 * beside it will easily getting bugs.
 */

module.exports = {
    array:
    [
        [/^\/[a-zA-Z0-9\/-/]*.js$/, "text/javascript"],
        [/^\/[a-zA-Z0-9\/-/]*.bundle.min.js$/, "text/javascript"],
        [/^\/[a-zA-Z0-9\/-/]*.css$/, "text/css"],
        [/^\/[a-zA-Z0-9\/-]*.min.css$/, "text/css"],
        [/^\/[a-zA-Z0-9\/-/]*.jpg$/, "image/jpg"],
        [/^\/[a-zA-Z0-9-._\/]*.min.js$/, "text/javascript"],
        [/^\/[a-zA-Z0-9-]*.min.css.map$/, "text/map"],
        [/^\/[a-zA-Z0-9\/-/]*.min.js.map$/, "text/map"],
        [/^\/[a-zA-Z0-9\/-/]*.css.map$/, "text/map"],
        [/^\/[a-zA-Z0-9\/-/]*.png$/, "image/png"],
        [/^\/[a-zA-Z0-9\/-/]*.ico$/, "text/ico"],
        [/^\/[a-zA-Z0-9\/-/?]*.ttf$/, "text/font"],
        [/^\/[a-zA-Z0-9\/-/?]*.woff$/, "text/woff"],
        [/^\/[a-zA-Z0-9\/-/?]*.woff2$/, "text/woff2"],
    ]
};