import path from 'path'

export default {
    mode: 'development',
    entry: {
        agregarSql: './src/js/agregarSql.js',
        apiMasiv: './src/js/apiMasiv.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}