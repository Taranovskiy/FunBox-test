"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const del = require("del");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const mqpacker = require("css-mqpacker");
const minify = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const rollup = require("gulp-better-rollup");
const sourcemaps = require("gulp-sourcemaps");
const mocha = require("gulp-mocha");
const uglify = require("gulp-uglify-es").default;
const svgmin = require("gulp-svgmin");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const svgSprite = require("gulp-svg-sprite");
const concat = require("gulp-concat");
const flow = require("rollup-plugin-flow");
const jsonServer = require("gulp-json-srv");
const serv = jsonServer.create({
    port: 3000,
});

gulp.task("clean-html", function() {
    return del("src/*.html");
});

gulp.task("pug", ["clean-html"], function() {
    return gulp
        .src("src/pug/pages/*.pug")
        .pipe(
            pug({
                pretty: true
            })
        )
        .pipe(gulp.dest("src"));
});

gulp.task("style", function() {
    gulp.src("src/sass/main.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(
            postcss([
                autoprefixer({
                    browsers: [
                        "last 1 version",
                        "last 2 Chrome versions",
                        "last 2 Firefox versions",
                        "last 2 Opera versions",
                        "last 2 Edge versions"
                    ]
                }),
                mqpacker({
                    sort: true
                })
            ])
        )
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream())
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"));
});

gulp.task("scripts", function() {
    return gulp
        .src("src/js/main.js")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(
            rollup(
                {
                    plugins: [flow()]
                },
                "iife"
            )
        )
        .pipe(uglify())
        .pipe(sourcemaps.write(""))
        .pipe(gulp.dest("build/js"));
});

gulp.task("scripts:lib", function() {
    return gulp
        .src([
            "node_modules/svg4everybody/dist/svg4everybody.min.js",
            "node_modules/picturefill/dist/picturefill.min.js"
        ])
        .pipe(plumber())
        .pipe(concat("libs.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("build/js"));
});

gulp.task("imagemin", ["copy"], function() {
    return gulp
        .src("src/img/**/*.{jpg,png,gif}")
        .pipe(
            imagemin([
                imagemin.optipng({
                    optimizationLevel: 3
                }),
                imagemin.jpegtran({
                    progressive: true
                })
            ])
        )
        .pipe(gulp.dest("build/img"));
});

gulp.task("svg", function() {
    return gulp
        .src("src/img/svg/*.svg")
        .pipe(
            svgmin({
                js2svg: {
                    pretty: true
                }
            })
        )
        .pipe(
            cheerio({
                run: function($) {
                    $("[fill]").removeAttr("fill");
                    $("[stroke]").removeAttr("stroke");
                    $("[style]").removeAttr("style");
                },
                parserOptions: { xmlMode: true }
            })
        )
        .pipe(replace("&gt;", ">"))
        .pipe(
            svgSprite({
                mode: {
                    symbol: {
                        sprite: "sprite.svg"
                    }
                }
            })
        )
        .pipe(gulp.dest("./build/img/svg/"));
});

gulp.task("copy-html", function() {
    return gulp
        .src("src/*.html")
        .pipe(gulp.dest("build"))
        .pipe(server.stream());
});

gulp.task(
    "copy",
    ["copy-html", "scripts:lib", "scripts", "style", "svg"],
    function() {
        return gulp
            .src(["src/fonts/**/*.{woff,woff2}", "src/img/*.*"], {
                base: "./src"
            })
            .pipe(gulp.dest("build"));
    }
);

gulp.task("clean", function() {
    return del("build");
});

gulp.task("js-watch", ["scripts"], function(done) {
    server.reload();
    done();
});

gulp.task("serve", ["assemble", "jsonserver"], function() {
    server.init({
        server: "./build",
        notify: false,
        open: true,
        port: 3502,
        ui: false
    });

    gulp.watch("src/sass/**/*.{scss,sass}", ["style"]);
    gulp.watch("src/pug/**/*.pug", ["pug"]);
    gulp.watch("src/*.html").on("change", e => {
        if (e.type !== "deleted") {
            gulp.start("copy-html");
        }
    });
    gulp.watch("src/js/**/*.js", ["js-watch"]);
});

gulp.task("serve-no-server", ["assemble"], function() {
    server.init({
        server: "./build",
        notify: false,
        open: true,
        port: 3502,
        ui: false
    });

    gulp.watch("src/sass/**/*.{scss,sass}", ["style"]);
    gulp.watch("src/pug/**/*.pug", ["pug"]);
    gulp.watch("src/*.html").on("change", e => {
        if (e.type !== "deleted") {
            gulp.start("copy-html");
        }
    });
    gulp.watch("src/js/**/*.js", ["js-watch"]);
});

gulp.task("database", function() {
    return gulp.src("src/js/data/data.json").pipe(serv.pipe());
});

gulp.task("jsonserver-watch", function() {
    gulp.watch(["src/js/data/data.json"], ["database"]);
});

gulp.task("jsonserver", ["database", "jsonserver-watch"]);

gulp.task("assemble", ["clean", "pug"], function() {
    gulp.start("copy", "style");
});

gulp.task("build", ["assemble", "imagemin"]);

gulp.task("test", function() {
    return gulp
        .src(["src/js/**/*.test.js"], {
            read: false
        })
        .pipe(
            mocha({
                compilers: ["js:babel-register"],
                reporter: "spec"
            })
        );
});
