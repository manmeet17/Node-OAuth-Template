var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', isAuthenticated ,function(req, res, next) {
  res.send({
    message: "Logged In",
    user: req.user
  });
});

function isAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    next();
  } else {
    res.json({
      message: "Not authenticated"
    })
  }
}

module.exports = router;
