import mongoose from "mongoose";

export default [
  {
    "name": "Test Product 2",
    "cartQuantity": 1,
    "categories": ["Test"],
    "currency": "NGN",
    "description":
      "fgrdhtfjykuyhghjdxvdgtgsfenhgdvdftmfhfrtghrgh5hrgru5rsdvrttjhrfsdgrjtgbvsg4rthrytufdfcvsfg57utfe",
    "warranty": "645675",
    "reviews": [],
    "price": 56.2,
    "discountPercentage": 12,
    "rating": 3.9,
    "quantity": 54,
    "images": [],
    "manufacturer": {
      "name": "Gerz",
      "image": ""
    },
    "slug": "",
    _id: mongoose.Types.ObjectId.generate(),
    isFeatured: true
  },
  {
    "name": "Test Product 3",
    "cartQuantity": 1,
    "categories": ["Test"],
    "currency": "NGN",
    "description":
      "fgrdhtfjykuyhghjdxvdgtgsfenhgdvdftmfhfrtghrgh5hrgru5rsdvrttjhrfsdgrjtgbvsg4rthrytufdfcvsfg57utfe",
    "warranty": "645675",
    "reviews": [],
    "price": 56.2,
    "discountPercentage": 12,
    "rating": 3.9,
    "quantity": 54,
    "images": [],
    "manufacturer": {
      "name": "Gerz",
      "image": ""
    },
    "slug": "",
    _id: mongoose.Types.ObjectId.generate(),
    isFeatured: false
  }
]
