const express = require("express");
const { findById } = require("../models/Sneaker");
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
    Sneaker.find({ category: "kids" })
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
    Sneaker.find({ category: "men" })
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
    Sneaker.find({ category: "women" })
        .then((dbRes) => {
            res.render("products.hbs", {
                sneakers: dbRes
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

router.get("/prod-add", (req, res) => {
    res.render("products_add.hbs");
});


router.post("/prod-add", (req, res) => {
    Sneaker.create(req.body)
        .then((dbRes) => {
            console.log(dbRes);
            res.redirect("/sneakers/collection")
        })
        .catch((error) => {
            console.log(error);
        });
});



router.get("/one-product/:id", (req, res) => {
    Sneaker.findById(req.params.id)
        .then((dbRes) => {
            res.render("one_product.hbs", {
                sneaker: dbRes
            })
        })
        .catch((error) => {
            console.log(error);
        });
});

router.get("/prod-manage", (req, res) => {
    Sneaker.find()
        .then((dbRes) => {
            res.render("products_manage.hbs", {
                sneakers: dbRes
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

router.get("/prod-edit/:id", (req, res) => {
    Sneaker.findById(req.params.id)
        .then((dbRes) => {

            res.render("product_edit.hbs", {
                sneaker: dbRes
            });
            console.log(dbRes);
        })
        .catch((error) => {
            console.log(error);
        });
});

router.post("/prod-edit/:id", (req, res) => {
    Sneaker.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((dbRes) => {
            console.log(dbRes);
            res.redirect("/sneakers/collection");
        })
        .catch((error) => {
            console.log(error);
        });
});


router.get("/prod-delete/:id", (req, res) => {
    Sneaker.findByIdAndDelete(req.params.id)
        .then(() => {

            res.redirect("/sneakers/collection");
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