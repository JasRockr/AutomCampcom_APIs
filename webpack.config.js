import path from 'path'

export default {
    mode: 'development',
    entry: {
        agregarSql: './src/js/agregarSql.js',
        apiMasiv: './src/js/apiMasiv.js',
        sendAlert: './src/js/sendAlert.js',
        test: './src/js/test.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}