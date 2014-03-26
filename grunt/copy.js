module.exports = {
    dev: {
        files: [
            {expand : true, cwd: 'app', src: ['*.html', '**/*.js'], dest : 'build', filter: 'isFile'},
            {expand : true, cwd: 'app/images', src:['*.png', '*.jpg'], dest: 'build/images'}
        ]
    },
    build: {
        files: [
            { expand : true, cwd: 'app', src: ['*.html'], dest : 'dist', filter: 'isFile' },
            { expand : true, cwd: 'app/images', src:['*.png', '*.jpg'], dest: 'dist/images' }
        ]
    }
}
