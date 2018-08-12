const router = require('express').Router();
const async =require('async');
const Gig=require('../models/gig');

router.get('/', (req, res, next) => {
    res.render('main/home');
});

router.get('/my-gigs',(req,res,next)=>{
    res.render('main/my-gigs');
})

router.route('/add-new-gig')
    .get((req,res,next)=>{
        res.render('main/add-new-gig');
    })
    .post((req,res,next)=>{
        async.waterfall([
            function(callback){
                let gig = new Gig();
                gig.owner=req.user._id;
                gig.title=req.body.gig_title;
                gig.category=req.body.gig_category;
                gig.about=req.body.gig_abou;
                gig.price=req.body.gig_price;
                gig.save(function(err){
                    calback(err,gig);
                });    
                // gig.picture=req.body.gig_picture;
                // gig.created=req.body.gig_created;
            },

            function(gig,callback){
                User.update({
                    _id:req.user._id
                },
                {
                    $push:{gigs:gig._id}
                },function(err,count){
                    res.redirect('/my-gigs');
                }
            )
            }
        ]);
    });

module.exports = router;
