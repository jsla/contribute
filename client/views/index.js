const html = require('choo/html')

module.exports = function (state, prev, send) {
  var aClass = 'dib pa2 no-underline bg-animate hover-bg-yellow black'
  return html`
    <div>
      <h1>I'd like to <a class=${aClass} href='/speak'>SPEAK</a></h1>
      <h1>My company would love to <a class=${aClass} href='/host'>HOST</a></h1>
      <h1>We would like to <a class=${aClass} href='/sponsor'>SPONSOR</a></h1>
    </div>
  `
}
