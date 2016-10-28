const css = require('sheetify')
const choo = require('choo')

css('normalize.css')
css('tachyons')
document.body.setAttribute(
  'class',
  'pa5 bg-near-white near-black avenir'
)

document.title = 'Come speak at js.la!'

const app = choo()

app.model(require('./model'))

app.router((route) => [
  route('/', require('./views/speakers'))
])

const tree = app.start()
document.body.appendChild(tree)
