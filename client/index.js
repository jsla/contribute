const css = require('sheetify')
const choo = require('choo')

css('normalize.css')
css('tachyons')
document.body.setAttribute(
  'class',
  'pa5 bg-near-white near-black avenir'
)

document.title = 'js.la - Contribute'

const app = choo()

app.model(require('./model'))

app.router((route) => [
  route('/', require('./views')),
  route('/speak', require('./views/speakers')),
  route('/host', require('./views/hosts')),
  route('/sponsor', require('./views/sponsors'))
])

const tree = app.start()
document.body.appendChild(tree)
