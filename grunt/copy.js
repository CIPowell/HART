module.exports = {
    html: {
        files: [{ expand : true, cwd: 'app/templates', src: ['*.html'], dest : 'dist/templates', filter: 'isFile'}]
    },
    css: {
        files: [{ expand : true, cwd: 'app/css', src: ['font/.*'], dest : 'dist/css'}]
    },
    images:{
        files: [{expand : true, cwd: 'app/images', src:['*.png', '*.jpg'], dest: 'dist/images'}]
    }
}
