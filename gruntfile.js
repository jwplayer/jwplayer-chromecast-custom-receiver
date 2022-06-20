module.exports = function (grunt) {
    grunt.initConfig({
        dist: "dist",
        package: grunt.file.readJSON("package.json"),

        clean: ["<%= dist %>/*"],
        copy: {
            main: {
                files: [
                    { expand: true, src: ["index.html"], dest: "<%= dist %>/", flatten: true },
                    { expand: true, src: ["assets/**"], dest: "<%= dist %>/", flatten: true },
                ]
            }
        },
        concat: {
            options: {},
            dist: {
                src: [ "src/main.js" ],
                dest: "dist/main.js",
            },
        },
        uglify: {
            js: {
                files: {
                    "dist/main.min.js": ['dist/main.js']
                }
            }
        },
        connect: {
            server: {
                options: {
                    protocol: "https",
                    hostname: "jwplayer-chromecast.local.vuplay.co.uk",
                    port: 14703,
                    base: "dist",
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-connect");

    grunt.registerTask("build", ["clean", "copy", "concat", "uglify"]);
    grunt.registerTask("serve", ["build", "connect"]);
};