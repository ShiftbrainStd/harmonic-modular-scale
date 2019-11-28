const glob = require('fast-glob')
const { runSass } = require('sass-true')
const sass = require('sass')

const options = {
  sass,
  describe,
  it,
}

glob
  .sync('./*.test.scss', {
    cwd: __dirname,
    absolute: true,
  })
  .forEach(file => runSass({ file }, options))
