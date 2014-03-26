module.exports = {
//    js: {
//        files : '**/*.js',
//        tasks : ['node_serverOne']
//    },
    css: {
        files: 'app/css/**/*.less',
        tasks: ['less', 'autoprefixer'],
        options: {
          livereload: true,
        }
    },
    js: {
        files: 'app/js/**/*.js',
        tasks: ['copy:dev'],
        options: {
          livereload: true,
        }
    },
    livereload: {
        options: {
            livereload: 3579
        },
        files: [
            'app/*.html',
            'app/css/**/*.less',
            'app/js/**/*.js'
        ]
    }
}
