const html = require('choo/html')

module.exports = function (state, prev, send) {
  return html`
    <div>
      <h1>Speak</h1>
      <h1>Host</h1>
      <h1>Sponsor</h1>
    </div>
  `
}
