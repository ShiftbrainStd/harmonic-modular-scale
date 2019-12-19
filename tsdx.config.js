module.exports = {
  rollup(config, { format, entry }) {
    if (format === 'umd') {
      config.external = []
    }
    return config
  },
}
