const passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
 function(req, res) {
   res.redirect('/');
 });

router.get('/facebook',passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/user',(req,res)=>{
    res.send(req.user);
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.send(req.user);
});

module.exports = router;