const express = require("express");
const router = express.Router();
const Sneaker = require("../models/Sneaker");

// return console.log(`\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n`
// );

router.get("/", (req, res) => {
    res.render("index.hbs");
});

router.get("/sneakers/collection", (req, res) => {
    Sneaker.find()
    .then((dbRes) => {
        res.render("products.hbs", {
            sneakers: dbRes
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

router.get("/sneakers/kids", (req, res) => {
    Sneaker.find({category: "kids"})
    .then((dbRes) => {
        res.render("products.hbs", {
            sneakers: dbRes
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

router.get("/sneakers/men", (req, res) => {
    Sneaker.find({category: "men"})
    .then((dbRes) => {
        res.render("products.hbs", {
            sneakers: dbRes
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

router.get("/sneakers/women", (req, res) => {
    Sneaker.find({category: "women"})
    .then((dbRes) => {
        res.render("products.hbs", {
            sneakers: dbRes
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

// router.get("/sneakers/:cat", (req, res) => {
//   res.send("bar");
// });

// router.get("/one-product/:id", (req, res) => {
//   res.send("baz");
// });

// router.get("/signup", (req, res) => {
//   res.send("sneak");
// });

// router.get("/signin", (req, res) => {
//   res.send("love");
// });


module.exports = router;