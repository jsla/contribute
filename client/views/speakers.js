const html = require('choo/html')
const dateable = require('dateable')

module.exports = function (state, prev, send) {
  var dates = getDates()

  return html`
    <div>
      <h1 class='f2'>Want to speak at js.la?</h1>

      <h2 class='f1'>Awesome!</h2>

      <div>
        <h3 class='f3'>Here are some things you should know:</h3>

        <p class='f4 lh-copy measure'>
          Our talks are 30 minutes in length. Usually, this is 20-25 minutes of content followed by 5-10 minutes of Q&A. We've found this to be long enough for good detail while being short enough to hold the audience's attention. This length is also great for online -- just about the right duration for someone to watch during lunch or a coffee break.
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
                  How can we get in touch with you?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email" placeholder="webmaster@myawesomedomain.com">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="abstract">
                  What would you like to talk about?
                </label>

                <textarea class="pa2 input-reset ba bg-transparent w-100 h5 measure" type="abstract" name="abstract" placeholder="So I really needed to..."></textarea>
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  If you had to come up with a working title that you could change later,<br> what would it be?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email" placeholder="The Mystery of the Shadow DOM">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  What avatar image of you should we use to promote your talk?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" name="name" type="email" placeholder="http://twitfacehub.com/path/avatar.jpg">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  Have a Github?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email" placeholder="@githubname">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                  Have a Twitter?
                </label>

                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email" placeholder="@twittername">
              </div>

              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="name">
                When are you available?
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

function getDates (n) {
  n = n || 5
  var dates = []

  var invalidMonths = [-1, 10, 11]

  var thisMonth
  var lastThurs
  var lastMonth = -1
  var d = new Date()

  while (dates.length < n) {
    d = incrementDate(d)

    thisMonth = d.getMonth()
    var isValidMonth = invalidMonths.indexOf(lastMonth) === -1
    var isNewMonth = thisMonth !== lastMonth

    if (lastThurs && isValidMonth && isNewMonth) { dates.push(lastThurs) }

    if (d.getDay() === 4) lastThurs = d
    lastMonth = thisMonth
  }

  return dates
}

function incrementDate (d) { return new Date(d.valueOf() + 24 * 3600 * 1000) }

// <p class='f4 lh-copy measure'>
//   Our group is mostly mid-level to senior developers so don't worry about needing to cater to beginners too much. Code example are welcome, so don't be afraid to get technical (usually this is when the best conversations/ questions come up). Also, since our talks are recorded and posted online, you have more leeway in the skill level you focus on.
// </p>
