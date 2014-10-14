module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            express: {
                files:  ['**/*.js'],
                tasks:  ['express'],
                options: {
                    spawn: false
                }
            }
        },
        express: {
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('default', [ 'express', 'watch' ]);

};