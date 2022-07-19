module.exports = (grunt) => {
    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),
        clean: ['dist/*'],
        copy: {
            all: {
                expand: true,
                src: ['src/sender/index.html', 'src/sender/cast-service.js'],
                dest: 'dist/',
                flatten: true
            }
        },
        watch: {
            scripts: {
                files: ['**/*.js', '**/*.html'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        },
        connect: {
            server: {
                options: {
                    protocol: 'https',
                    hostname: 'cast.studiodrm.local.drm.technology',
                    port: 14705,
                    base: 'dist',
                    keepalive: true
                }
            }
        },
        concurrent: {
            connectandwatch: {
                tasks: ['connect', 'watch'],
                options: {
                    logConcurrentOutput: true,
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('build', ['clean', 'copy']);
    grunt.registerTask("serve", ["build", 'concurrent:connectandwatch']);
}