const router = require('express').Router();
const Gig = require('../models/gig');
const config = require('../config/config');
let secretkey = config.SECRET_KEY;
const stripe = require('stripe')(secretkey);


const fee = 3.15;

router.get('/checkout/single_package/:id', (req, res, next) => {
    Gig.findOne({ _id: req.params.id }, function (err, gig) {
        let totalPrice = gig.price + fee;
        req.session.gig = gig;
        req.session.price = totalPrice;
        res.render('checkout/single_package', { gig: gig, totalPrice: totalPrice });
    });
});

router.route('/payment')
    .get((req, res, next) => {
        res.render('checkout/payment');
    })
    .post((req, res, next) => {
        let gig=req.session.gig;
        let price=req.session.price;
        price*=100;

        stripe.customers.create({
            email: req.user.email
        }).then(function (customer) {
            return stripe.customers.createSource(customer.id, {
                source: req.body.stripeToken
            });
        }).then(function (source) {
            return stripe.charges.create({
                amount: price,
                currency: 'usd',
                customer: source.customer
            });
        }).then(function (charge) {
            // Do something
            res.redirect('/');
        }).catch(function (err) {
            // Deal with an error
        });
    })


module.exports = router;