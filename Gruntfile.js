module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    manifest: grunt.file.readJSON('chrome/FilePreviews/manifest.json'),

    clean: {
      build: ['chrome/build']
    },

    copy: {
      chrome: {
        files: [
          {
            expand: true,
            src: ['chrome/FilePreviews/icons/*'],
            dest: 'chrome/build/icons/',
            flatten: true
          },
          {
            expand: true,
            src: ['chrome/FilePreviews/img/*'],
            dest: 'chrome/build/img/',
            flatten: true
          },
          {
            expand: true,
            src: ['chrome/FilePreviews/*.html', 'chrome/FilePreviews/manifest.json'],
            dest: 'chrome/build/',
            filter:'isFile',
            flatten: true
          },
        ]
      }
    },

    concat: {
      options: {
        banner: '/* <%= manifest.name %> <%= manifest.version %> */\n'
      },
      vendor: {
        src: [
          'chrome/FilePreviews/bower_components/jquery/dist/jquery.js',
          'chrome/FilePreviews/bower_components/url/url.js',
          'chrome/FilePreviews/bower_components/filepreviews/dist/filepreviews.js'
        ],
        dest: 'chrome/build/js/vendor.js'
      }
    },

    uglify: {
      options: {
        banner: '/* <%= manifest.name %> <%= manifest.version %> */\n'
      },
      dist: {
        files: {
          'chrome/build/js/vendor.js': ['chrome/build/js/vendor.js'],
          'chrome/build/js/background.js': ['chrome/FilePreviews/js/background.js'],
          'chrome/build/js/preview.js': ['chrome/FilePreviews/js/preview.js']
        }
      }
    },

    watch: {
      scripts: {
        files: ['chrome/FilePreviews/**/*'],
        tasks: ['default']
      }
    },

    compress: {
      main: {
        options: {
          archive: 'chrome/dist/<%= manifest.short_name %><%= manifest.version %>.zip'
        },
        files: [
          {
            expand: true,
            cwd: 'chrome/build/',
            src: ['**/*'],
            dest: '<%= manifest.short_name %><%= manifest.version %>'
          }
        ]
      }
    }


  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'copy', 'concat', 'uglify']);
  grunt.registerTask('build', ['default']);
  grunt.registerTask('build:dist', ['default', 'compress']);
};
