const html = require('choo/html')
const css = require('sheetify')

const prefix = css`
	:host .logo { 
		height: 49px;
	}

	:host a {
		background-color: gold;
	}
`

module.exports = function (state, prev, send) {
	var aClass = 'dib pa2 no-underline bg-animate hover-bg-yellow black'
	var logoClass = 'logo'

	return html`
		<div class=${prefix}>
			<img src="http://js.la/images/logo.svg" class=${logoClass} />
			<h1>I'd like to <a class=${aClass} href='/speak'>SPEAK</a></h1>
			<h1>My company would love to <a class=${aClass} href='/host'>HOST</a></h1>
			<h1>We would like to <a class=${aClass} href='/sponsor'>SPONSOR</a></h1>
		</div>
	`
}
