const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

const SALT = 10;

router.get("/signup", (req,res, next) => {
    res.render("signup.hbs")
});

router.post("/signup", async (req, res, next) => {
    try {
        const newUser = req.body
        console.log(newUser)

        if (!newUser.password || !newUser.email) {
            res.render("signup.hbs", {
                msg: "Please provide an email and a password",
            })
            return
        };

        const foundUser = await User.findOne({ email: newUser.email })

        if (foundUser) {
            res.render("signup.hbs", {
                msg: "Email taken"
            });
            return
        };

        const hashedPassword = bcrypt.hashSync(newUser.password, SALT);
        newUser.password = hashedPassword;

        const createdUser = await User.create(newUser)
        res.redirect("/signin")
    }
    catch (error) { next(error)};
})


router.get("/signin", (req,res, next) => {
    res.render("signin.hbs")
});


router.post("/signin", async (req, res, next) => {
    try {

        const foundUser = await User.findOne({
            email: req.body.email
        });

        
        if (!foundUser) {
            res.render("signin.hbs", {
                msg: "user does not exist"
            });
            return
        }

        const isValidPassword = bcrypt.compareSync(req.body.password, foundUser.password);

        if (isValidPassword) {
            req.session.currentUser = {
              _id: foundUser._id,
            };

            res.redirect("/prod-manage");
          } 
            else {
            res.render("signin.hbs", {
              msg: "Bad credentials",
            });
            console.log("Bad credentials")
            return;
          }
    }
    catch (error) {}
})

router.get("/logout", (req, res, next) => {
    req.session.destroy((error) => {
      if (error) {
        next(error);
      } else {
        res.redirect("/signin");
      }
    });
  });

module.exports = router;
