const stripe = require('stripe')('sk_test_51H9xglDKOwc28a4HR6Ut696F0wN71OhUCQw48V4AB7bM8EaFtaHEe1l4pjwp3MO3qzwOBvsr8BE2vW5gpfakaduC00QLYEbZMg')

async function postCharge(req, res) {
  try {
    const { amount, source, receipt_email } = req.body

    const charge = await stripe.charges.create({
      amount,
      source,
      receipt_email,
      currency: 'usd'
    })

    if (!charge) res.status(422).json({
      msg: 'Payment Unsuccessful'
    })

    res.status(200).json({
      msg: 'Membership Activated Successfully',
      charge
    })
  } catch (error) {
    res.status(422).json({
      msg: error.message
    })
  }
}

module.exports = postCharge
