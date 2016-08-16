module.exports = function (grunt) {

  var paths = {
    app: '../app/',
    markup: 'jade/',
    styles: 'less/',
    scripts: 'master/js/'
  }
  // 构建任务配置
  grunt.initConfig({

    //读取package.json的内容，形成个json数据
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      html: {
        files: ['app/views/**/*.html'],
        options: {livereload:true}
      },
      css: {
        files: ['app/css/*.css'],
        options: {livereload:true}
      },
      js: {
        files: ['master/js/**/*.js'],
        tasks: ['concat'],
        options: {livereload:true}
      },
      sass: {
        files: ['app/less/*.less'],
        tasks: ['less'],
        options: {livereload:true}
      }
    },
    less: {
      dev: {
        src: ['app/less/*.less'],
        dest: 'app/css/custom.css'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist1: {
        src: [
                'master/app.module.js',
                // template modules
                paths.scripts + 'modules/**/*.module.js',
                paths.scripts + 'modules/**/*.js',
                // custom modules
                paths.scripts + 'custom/**/*.module.js',
                paths.scripts + 'custom/**/*.js'
              ],
        dest: 'app/js/app2.js'
      }
    },
    //压缩js
    uglify: {
      //文件头部输出信息
      options: {
      },
      my_target: {
        options: {
          mangle: false, //不混淆变量名
        },
        files: [
          {
            expand: true,
            mangle: false,
            //相对路径
            cwd: 'js/controllers',
            src: '*.js',
            dest: 'js/controllersmin/',
            rename: function (dest, src) {
              var folder = src.substring(0, src.lastIndexOf('/'));
              var filename = src.substring(src.lastIndexOf('/'), src.length);
              //  var filename=src;
              filename = filename.substring(0, filename.lastIndexOf('.'));
              var fileresult=dest + folder + filename + '.min.js';
              grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);
              return fileresult;
              //return  filename + '.min.js';
            }
          },
          {
            expand: true,
            mangle: false,
            //相对路径
            cwd: 'js/main',
            src: '*.js',
            dest: 'js/mainmin/',
            rename: function (dest, src) {
              var folder = src.substring(0, src.lastIndexOf('/'));
              var filename = src.substring(src.lastIndexOf('/'), src.length);
              //  var filename=src;
              filename = filename.substring(0, filename.lastIndexOf('.'));
              var fileresult=dest + folder + filename + '.min.js';
              grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);

              return fileresult;
              //return  filename + '.min.js';
            }
          }
        ]
      }
    },

    //压缩css
    cssmin: {
      //文件头部输出信息
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        //美化代码
        beautify: {
          //中文ascii化，非常有用！防止中文乱码的神配置
          ascii_only: true
        }
      },
      my_target: {
        files: [
          {
            expand: true,
            //相对路径
            cwd: 'css/',
            src: '*.css',
            dest: 'dest/css/',
            rename: function (dest, src) {
              var folder = src.substring(0, src.lastIndexOf('/'));
              var filename = src.substring(src.lastIndexOf('/'), src.length);
              //  var filename=src;
              filename = filename.substring(0, filename.lastIndexOf('.'));
              var fileresult=dest + folder + filename + '.min.css';
              grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);

              return fileresult;
              //return  filename + '.min.js';
            }
          }
        ]
      }
    }


  });

  // 加载指定插件任务
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default',['watch']);

  // 默认执行的任务
  //grunt.registerTask('default', ['concat']);

};
