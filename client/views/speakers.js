const html = require('choo/html')
const dateable = require('dateable')
const dates = require('../dates')

module.exports = function (state, prev, send) {
  document.title = 'Come speak at js.la!'

  return html`
    <div>
      ${renderIntro()}

      ${renderForm()}
    </div>
  `

  function renderIntro () {
    return html`
      <div>
        <h1 class='f2'>Want to speak at js.la?</h1>

        <h2 class='f1'>Awesome!</h2>

        <div>
          <h3 class='f3'>Here are some things you should know:</h3>

          <p class='f4 lh-copy measure'>
            Our talks are 30 minutes in length. Usually, this is 20-25 minutes of content followed by 5-10 minutes of Q+A. We've found this to be long enough for good detail while being short enough to hold the audience's attention. This length is also great for online -- just about the right duration for someone to watch during lunch or a coffee break.
          </p>

          <p class='f4 lh-copy measure'>
          If you intend to promote a product, app, service, or technology, be careful. It's important that your talk does not come across as a sales pitch. Consider giving a behind the scenes look at your work or take the audience on your journey that led to where you are now. Feature tours do not make good talks.
          </p>

          <p class='f4 lh-copy measure'>
            The best talks are focused on a personal experience. A great format for this is a three part story:
            <ol>
              <li>What did you want and why?</li>
              <li>What different things did you try and why? How did that turn out for you?</li>
              <li>What did you learn? What surprised you? If you could go back in time, what would you tell yourself before starting?</li>
          </p>
        </div>
      </div>
    `
  }

  function renderForm () {
    return html`
      <div class='mt5'>
        <h4 class='f6'>Now, with that out of the way...</h4>
        <h3 class='f3'>Let's talk about you.</h3>

        <article class="black-80">
          <form action="sign-up_submit" method="get" accept-charset="utf-8">
            <fieldset id="sign_up" class="ba b--transparent ph0 mh0">

              ${textField({
                key: 'name',
                label: 'What\'s your name?',
                placeholder: 'Person Adulthuman',
                value: ''
              }, update)}

              ${textField({
                key: 'email',
                label: 'How can we get in touch with you?',
                placeholder: 'webmaster@myawesomedomain.com',
                value: ''
              }, update)}

              ${textArea({
                key: 'abstract',
                label: 'What would you like to talk about?',
                placeholder: 'This all started when I needed to...',
                value: ''
              }, update)}

              ${textField({
                key: 'title',
                label: 'If you had to come up with a working title that you could change later, what would it be?',
                placeholder: 'The Curious Case of the Missing Shadow DOM',
                value: ''
              }, update)}

              ${textField({
                key: 'avatar',
                label: 'What avatar image of you should we use to promote your talk?',
                placeholder: 'http://twitfacehub.com/path/avatar.jpg',
                value: ''
              }, update)}

              ${textField({
                key: 'github',
                label: 'Have a Github?',
                placeholder: '@githubname',
                value: ''
              }, update)}

              ${textField({
                key: 'twitter',
                label: 'Have a Twitter?',
                placeholder: '@twittername',
                value: ''
              }, update)}

              ${dateSelect({
                key: 'dates',
                label: 'When are you available?',
                dates: dates,
                selected: dates.slice(0, 2)
              }, update)}

            </fieldset>

            <div class="mt3"><input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Let's do this."></div>
          </form>
        </article>
      </div>
    `
  }

  function textField (opts, cb) {
    return html`
      <div class="mt3">
        <label class="db fw4 lh-copy f6" for="${opts.key}">
          ${opts.label}
        </label>

        <input
          class="pa2 input-reset ba bg-transparent w-100 measure"
          name=${opts.key}
          placeholder="${opts.placeholder}"
          type="email"
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
          value="${opts.value}"
          onchange=${onchange}></textarea>
      </div>
    `

    function onchange (evt) { cb(opts.key, evt.target.value) }
  }

  function dateSelect (opts, cb) {
    var selected = opts.selected.map((d) => d)

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

  function update (key, value) {
    console.log('key', key)
    console.log('value', value)
  }
}

function createDate (str) {
  var arr = str.split('-').map(parseFloat)
  return new Date(arr[0], arr[1] - 1, arr[2])
}
