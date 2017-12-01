const passport = require('passport');

module.exports = (express) => {
    const router = express.Router();

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/auth/facebook');
    }


    router.get('/chat',  isLoggedIn, (req, res) => {
        res.sendFile(__dirname+ '/chat.html');
    });

    router.get('/auth/facebook', passport.authenticate('facebook',{ 
        scope: ['user_friends', 'manage_pages'] 
    }));

    router.get('/auth/facebook/callback', passport.authenticate('facebook',{ 
        failureRedirect:'/error'
    }),(req,res)=>{
        res.redirect('/chat');
    });

    router.get('/error', (req, res) => {
        res.send('You are not logged in!');
    });

    router.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    router.get('/logout',(req,res)=>{
        req.logout();
        res.redirect("/")
    });

    return router;
};