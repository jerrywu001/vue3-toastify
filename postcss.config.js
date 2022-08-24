// https://cssnano.co/docs/getting-started/

module.exports = {
  plugins: [
    require('cssnano')({
      preset: 'default',
    }),
    require('postcss-nested'),
    require('autoprefixer'),
  ]
}
