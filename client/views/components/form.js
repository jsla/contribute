const map = require('lodash/map')
const html = require('choo/html')
const dateable = require('dateable')
const css = require('sheetify')
const prefix = css`
  :host .confirmation {
    color: green;
  }
`

module.exports = {
  textField: textField,
  textArea: textArea,
  dateSelect: dateSelect,
  submitButton: submitButton
}

function textField (opts, cb) {
  return html`
    <div class="mt3">
      <label class="db fw4 lh-copy f6" for="${opts.key}">
        ${opts.label}
      </label>

      <em>${opts.note}</em>

      <input
        class="pa2 input-reset ba bg-transparent w-100 measure"
        name=${opts.key}
        placeholder="${opts.placeholder}"
        value=${opts.value || ''}
        onchange=${onchange} >
    </div>
  `

  function onchange (evt) { cb(opts.key, evt.target.value) }
}

function textArea (opts, cb) {
  return html`
    <div class="mt3">
      <label class="db fw4 lh-copy f6" for="${opts.key}">
        ${opts.label}
      </label>

      <textarea
        class="pa2 input-reset ba bg-transparent w-100 h5 measure"
        name="${opts.key}"
        placeholder="${opts.placeholder}"
        onchange=${onchange}>${opts.value}</textarea>
    </div>
  `

  function onchange (evt) { cb(opts.key, evt.target.value) }
}

function dateSelect (opts, cb) {
  var selected = map(opts.selected || [], (d) => d)

  return html`
    <div>
      <div class="mt3">
        <label class="db fw4 lh-copy f6" for="${opts.key}">
          ${opts.label}
        </label>
      </div>

      ${opts.dates.map(function (date) {
        return html`
          <div>
            <label class="pa0 ma0 lh-copy f6 pointer">
              <input
                type="checkbox"
                class='mr1'
                checked="${isChecked(date)}"
                onchange=${(e) => toggle(date)} />
              ${dateable(createDate(date), 'dddd, MMMM D')}
            </label>
          </div>
        `
      })}
    </div>
  `

  function toggle (date) {
    var i = selected.indexOf(date)
    if (i > -1) {
      selected.splice(i, 1)
    } else {
      selected.push(date)
    }
    cb(opts.key, selected)
  }
  function isChecked (date) { return selected.indexOf(date) > -1 }
}

function submitButton (opts, cb) {
  var text = opts[opts.value]
  var colors = {
    undefined: 'b--black black bg-transparent',
    done: 'b--dark-green green bg-transparent',
    error: 'b--dark-red red bg-transparent'
  }[opts.value]

  var style = 'b ph3 pv2 input-reset ba f6'

  if (opts.disabled) {
    style += ' b--gray gray bg-light-gray'
    text = 'Fill out the form to continue...'
  } else {
    style += ` ${colors} grow pointer`
  }

  if (opts.key === 'submitState' && opts.value === 'done') {
    text += ' A notifcation has been sent to the js.la team and someone will get back to you shortly.'

    var confirmClass = `mt3 ${prefix}`

    return html`
      <div class=${confirmClass}>
        <h4 class="confirmation">${text}</h4>
      </div>
    `
  }

  return html`
    <div class="mt3">
      <input
        disabled=${opts.disabled}
        class=${style}
        style=${opts.disabled ? 'opacity: 0.5' : ''}
        type="submit"
        value=${text}
        onclick=${(e) => {
          e.preventDefault()
          cb(opts.key, 'done')
        }} >
    </div>
  `
}

function createDate (str) {
  var arr = str.split('-').map(parseFloat)
  return new Date(arr[0], arr[1] - 1, arr[2])
}
