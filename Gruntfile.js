module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        mangle: false,
        beautify: false
      },
      scripts: {
        files: {
          "public/js/main.js": [
            "public/js/main/dependencies/*.js",
            "public/js/main/init.js"
          ],
          "public/js/map.js": [
            "public/js/map/dependencies/*.js",
            "public/js/map/init.js"
          ]
        }
      }
    },

    sass: {
      options: {
        sourceMap: true,
        precision: 4,
        outputStyle: "compact"
      },
      dist: {
        files: {
          "public/css/main.css": ["public/css/scss/main.scss"],
          "public/css/cp.css": ["public/css/scss/control-panel/main.scss"]
        }
      }
    },

    concat: {
      css: {
        files: {
          'public/css/main.css': ["public/css/lib/normalize.css", "public/css/third-party/*.css", "public/css/main.css"],
        },
      },
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({ grid: true, flexbox: true }),
          require('cssnano')()
        ]
      },
      dist: {
        files: [
          {
            src: "public/css/main.css",
            dest: 'public/css/main.css'
          }, 
          {
            src: 'public/css/cp.css',
            dest: 'public/css/cp.css'
          }
        ]
      }
    },

    mjml: {
      options: {},
      htmlEmail: {
        expand: true,
        cwd: "templates/email/",
        src: "*/*.html",
        dest: "templates/email/",
        mode: "html",
        rename: function(dest, src) {
          return dest + src.replace("/", "/compiled/");
        }
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: {
            port: 9000,
            key: grunt.file.read("../localhost.key"),
            cert: grunt.file.read("../localhost.crt")
          }
        },
        files: [
          "public/css/main.css",
          "public/js/main.js",
          "templates/**/*.html"
        ]
      },
      styles: {
        files: ["public/css/scss/**/*.scss", "public/css/third-party/*.css"],
        tasks: ["style"]
      },
      scripts: {
        files: ["public/js/*/**/*.js"],
        tasks: ["script"]
      },
      email: {
        files: ["templates/email/**/*.html"],
        tasks: ["mjml"]
      }
    }
  });

  grunt.registerTask("script", ["uglify"]);
  grunt.registerTask("style", ["sass", "concat", "postcss"]);
  grunt.registerTask("email", ["mjml"]);
  grunt.registerTask("default", ["script", "style", "email", "watch"]);

  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-mjml");
};
