var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/people-demo');
var peopleCollection = db.get('people');

router.get('/people/new', function(req, res, next){
  res.render('people/new')
});

router.get('/people', function(req, res, next){
  peopleCollection.find({}, function(err, data){
    res.render('people/index',{allPeople: data});
  });
});


router.post('/people', function (req, res, next) {
  var errors = []
  if (req.body.name.length == 0) {
    errors.push("Name can't be blank")
    console.log('Name')
  }
  if (req.body.hobby.length == 0) {
    errors.push("Hobby can't be blank")
    console.log('Hobby')
  }
  if (errors.length) {
    res.render('people/new', {errors: errors})
  } else {
    peopleCollection.insert({ name: req.body.name,
                             hobby: req.body.hobby
  }).then(function () {
  res.redirect('/people')
    })
  }
})
// req.flash('info', 'success')

// router.post('/people', function(req, res, next){
//   peopleCollection.insert({name: req.body.name,
//                           hobby: req.body.hobby});
//                           res.redirect('/people')
// });

module.exports = router;