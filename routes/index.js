const express = require("express");
const { findById } = require("../models/Sneaker");
const router = express.Router();
const Sneaker = require("../models/Sneaker");
const protectRoute = require("../middlewares/protectPrivateRoute");

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


router.get("/prod-add", protectRoute, function (req, res, next) {
    res.render("products_add.hbs");
});


router.post("/prod-add", protectRoute, (req, res, next) => {
    Sneaker.create(req.body)
        .then((dbRes) => {
            console.log(dbRes);
            res.redirect("/sneakers/collection")
        })
        .catch((error) => {
            console.log(error);
        });
});





router.get("/prod-manage", protectRoute, (req, res, next) => {
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

router.get("/prod-edit/:id", protectRoute, (req, res, next) => {
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

router.post("/prod-edit/:id", protectRoute, (req, res, next) => {
    Sneaker.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((dbRes) => {
            console.log(dbRes);
            res.redirect("/sneakers/collection");
        })
        .catch((error) => {
            console.log(error);
        });
});


router.get("/prod-delete/:id", protectRoute, (req, res, next) => {
    Sneaker.findByIdAndDelete(req.params.id)
        .then(() => {

            res.redirect("/sneakers/collection");
        })
        .catch((error) => {
            console.log(error);
        });
});


module.exports = router;