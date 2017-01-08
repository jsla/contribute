const html = require('choo/html')

module.exports = function (state, prev, send) {
  return html`
    <div>
      <h1>I'd like to <a href='/speak'>SPEAK</a></h1>
      <h1>My company would love to <a href='/host'>HOST</a></h1>
      <h1>We would like to <a href='/sponsor'>SPONSOR</a></h1>
    </div>
  `
}
