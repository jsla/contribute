module.exports = getDates(10)

function getDates (n) {
  n = n || 5
  var dates = []

  var invalidMonths = [-1, 10, 11]

  var thisMonth
  var lastThurs
  var lastMonth = -1
  var d = resetDate(new Date())

  while (dates.length < n) {
    d = incrementDate(d)

    thisMonth = d.getUTCMonth()
    var isValidMonth = invalidMonths.indexOf(lastMonth) === -1
    var isNewMonth = thisMonth !== lastMonth

    if (lastThurs && isValidMonth && isNewMonth) { dates.push(lastThurs) }

    if (d.getUTCDay() === 4) lastThurs = d
    lastMonth = thisMonth
  }

  var dateStrings = dates.map(function (d) {
    return d.toISOString().slice(0, 10)
  })

  return dateStrings
}

function incrementDate (d) {
  return new Date(d.valueOf() + 24 * 3600 * 1000)
}

function resetDate (d) {
  d.setUTCHours(1)
  d.setUTCMinutes(0)
  d.setUTCSeconds(0)
  d.setUTCMilliseconds(0)
  return d
}
