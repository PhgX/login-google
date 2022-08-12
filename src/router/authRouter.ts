import express from "express";
const router = express.Router();
import passport from "passport";
import multer from 'multer';

const upload = multer();

router.get("/login", (req, res) => {
  // this will render login.ejs file
  res.render("login");
});

router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// Retrieve user data using the access token received 
router.get(
  "/google/callback",
  passport.authenticate('google'),
  (req, res) => {
  res.send("You are authenticated")
  }
 );

router.post('/login', upload.none(), (req, res, next) => {
  console.log(req.body)
  passport.authenticate("local", (err, user) => {
    console.log(user, 'user')
    if(err){
      return next(err)
    }
    if(!user){
      console.log(req.body)
      return res.send("Wrong email or password")
    }
    req.login(user, () => {
      res.send("You are authenticated")
    })
  })(req, res, next)
})

export default router;