const effects = require('./effects')
const reducers = require('./reducers')

const state = {
  speaker: {},
  sponsor: {},
  host: {}
}

module.exports = {
  state: state,
  effects: effects,
  reducers: reducers
}
