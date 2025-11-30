const passport = require('passport');

const router = require("express").Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Hello World Right Now!!');
});

router.use('/course', require('./courses'));
router.use('/info', require('./personalnfo'))

router.get('/login',
  passport.authenticate('github'), (req, res) => {
   
  }
);

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/')
    });
});

module.exports = router;

// const  mongodb = require(`../data/database`);
// const app = express();

// const port = process.env.PORT || 3000;
