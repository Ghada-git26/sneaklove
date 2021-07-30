const mongoose = require("mongoose");
const Sneaker = require("../models/Sneaker");

const sneakers = [
{
    name: "Nike",
    ref: "1234",
    size: 43,
    description: "shoes",
    price: 80,
    category: "men",
    // id_tags: [ObjectId]
},
{
    name: "Adidas",
    ref: "1234",
    size: 43,
    description: "shoes",
    price: 80,
    category: "women",
    // id_tags: [ObjectId]
},
{
    name: "Puma",
    ref: "1234",
    size: 43,
    description: "shoes",
    price: 80,
    category: "kids",
    // id_tags: [ObjectId] 
}];

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    return Sneaker.deleteMany();
  })
    .then(() => {
        Sneaker.create(sneakers)
        .then((createdSneakers) => {
            console.log(createdSneakers);
        })
        .catch((error) => {
            console.log(error);
        });
    })
  .catch((error) => {
    console.log(error);
  });
