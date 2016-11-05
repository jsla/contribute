const html = require('choo/html')
const dateable = require('dateable')
const dates = require('../dates')

module.exports = function (state, prev, send) {
  return html`
    <div>
      <h1 class='f2'>Want to host js.la?</h1>

      <h2 class='f1'>Awesome!</h2>

      <div>
        <h3 class='f3'>Here are some things you should know:</h3>

        <p class='f4 lh-copy measure'>
          Leading up to the event we'll promote your organization on our front page, in tweets, on our Meetup.com page, and on our mailing list.
        </p>

        <p class='f4 lh-copy measure'>
          During the event, we'll display your custom slide, and you'll have the opportunity to introduce yourself and your organization to the attendees.
        </p>

        <p class='f4 lh-copy measure'>
          After the event, we'll feature your logo in videos of that month's talks and in our archive.
        </p>

      </div>

      <div class='mt5'>
        <h4 class='f6'>Now, with that out of the way...</h4>
        <h3 class='f3'>Let's talk about you.</h3>

        <article class="black-80">
          <form action="sign-up_submit" method="get" accept-charset="utf-8">
            <fieldset id="sign_up" class="ba b--transparent ph0 mh0">

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  What's your name?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" name="name" placeholder="Person Adulthuman" type="email">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  What's the name of your organization?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" name="name" placeholder="Stockmarket Business Co." type="email">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  How can we get in touch with you?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email" placeholder="webmaster@stockmarketbusiness.co">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="abstract">
                  We'd like host because...
                </label>

                <textarea class="pa2 input-reset ba bg-transparent w-100 h4 measure" type="abstract" name="abstract" placeholder="We're looking to hire amazing JS engineers and build product awareness."></textarea>
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  How many attendees could you host?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" name="name" type="email" placeholder="150">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  What hi-res logo should we use for our site and promotion?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" name="name" type="email" placeholder="http://stockmarketbusiness.co/path/logo.png">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  Where should we link to on our website and in promotions?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email" placeholder="http://stockmarketbusiness.co">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  What food and drinks will you have available for attendees?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email" placeholder="Pizza and beer">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  Do you have a projector and screen?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email" placeholder="Yes">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  Do you have a microphone and PA for the speaker?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email" placeholder="Yes">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  When can you host?
                </label>
              </div>

              ${dates.map(function (date) {
                return html`
                  <div>
                    <label class="pa0 ma0 lh-copy f6 pointer">
                      <input type="checkbox" class='mr1'>
                      ${dateable(date, 'dddd, MMMM D')}
                    </label>
                  </div>
                `
              })}

            </fieldset>

            <div class="mt3"><input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Let's do this."></div>
          </form>
        </article>
      </div>


    </div>
  `
}


// - the capacity for at least 100 attendees
// - food and drink (this can just be 🍕 and 🍺 it's up to y'all)
// - a PA or some type of quality sound system we can project speakers voice
// - projector and screen
// - some type of table/podium for the speaker to present from
