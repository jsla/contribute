const effects = require('./effects')
const reducers = require('./reducers')

const state = {
  speaker: {},
  sponsor: {},
  host: {},
  submitDate: {},
}

module.exports = {
  state: state,
  effects: effects,
  reducers: reducers,
  submitDate: submitDate,
}
