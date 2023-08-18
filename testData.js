const mongoose = require('mongoose')
const Product = require('./models/productModel')
const Category = require('./models/categoryModel')

const productsData = [
  {
    name: 'Laptop',
    desc: 'Powerful laptop with high-end specifications.',
    price: 999.99,
    category: '64de67326fc0bfd371994f22'
  },
  {
    name: 'Smartphone',
    desc: 'Latest smartphone model with advanced features.',
    price: 699,
    category: '64de67326fc0bfd371994f26'
  },
  {
    name: 'Headphones',
    desc: 'Noise-cancelling headphones for immersive audio experience.',
    price: 149.99,
    category: '64de67326fc0bfd371994f22'
  },
  {
    name: 'Coffee Maker',
    desc: 'Automatic coffee maker that brews delicious coffee.',
    price: 79.95,
    category: '64de67326fc0bfd371994f20'
  },
  {
    name: 'Running Shoes',
    desc: 'High-performance running shoes for athletes.',
    price: 129.5,
    category: '64de67326fc0bfd371994f20'
  },
  {
    name: 'Digital Camera',
    desc: 'Professional-grade digital camera with exceptional image quality.',
    price: 799,
    category: '64de67326fc0bfd371994f23'
  },
  {
    name: 'Smart TV',
    desc: 'Ultra HD smart TV with streaming capabilities.',
    price: 899.99,
    category: '64de67326fc0bfd371994f26'
  },
  {
    name: 'Backpack',
    desc: 'Durable backpack with multiple compartments for storage.',
    price: 49.95,
    category: '64de67326fc0bfd371994f20'
  },
  {
    name: 'Fitness Tracker',
    desc: 'Wearable fitness tracker that monitors your activity.',
    price: 89,
    category: '64de67326fc0bfd371994f1f'
  },
  {
    name: 'Cookware Set',
    desc: 'Complete set of high-quality cookware for your kitchen.',
    price: 249.95,
    category: '64de67326fc0bfd371994f26'
  }
]

// const categoryData = [
//   {
//     "categoryName": "Electronics"
//   },
//   {
//     "categoryName": "Clothing"
//   },
//   {
//     "categoryName": "Home Decor"
//   },
//   {
//     "categoryName": "Books"
//   },
//   {
//     "categoryName": "Sports Equipment"
//   },
//   {
//     "categoryName": "Beauty and Personal Care"
//   },
//   {
//     "categoryName": "Furniture"
//   },
//   {
//     "categoryName": "Groceries"
//   },
//   {
//     "categoryName": "Toys and Games"
//   },
//   {
//     "categoryName": "Automotive"
//   }
// ]


// const addCategories = async () => {
//   try {
//     const categories = await Category.insertMany(categoryData)
//     console.log(categories)
//   } catch (error) {
//     console.log(error);

//   }
// }

const addProducts = async () => {
  try {
    const products = await Product.insertMany(productsData)
    console.log(products)
  } catch (error) {
    console.log(error)
  }
}

module.exports = addProducts;


const categories = [
  {
    categoryName: 'Electronics',
    _id: "64de67326fc0bfd371994f1e",
    __v: 0
  },
  {
    categoryName: 'Clothing',
    _id: "64de67326fc0bfd371994f1f",
    __v: 0
  },
  {
    categoryName: 'Home Decor',
    _id: "64de67326fc0bfd371994f20",
    __v: 0
  },
  {
    categoryName: 'Books',
    _id: "64de67326fc0bfd371994f21",
    __v: 0
  },
  {
    categoryName: 'Sports Equipment',
    _id: "64de67326fc0bfd371994f22",
    __v: 0
  },
  {
    categoryName: 'Beauty and Personal Care',
    _id: "64de67326fc0bfd371994f23",
    __v: 0
  },
  {
    categoryName: 'Furniture',
    _id: "64de67326fc0bfd371994f24",
    __v: 0
  },
  {
    categoryName: 'Groceries',
    _id: "64de67326fc0bfd371994f25",
    __v: 0
  },
  {
    categoryName: 'Toys and Games',
    _id: "64de67326fc0bfd371994f26",
    __v: 0
  },
  {
    categoryName: 'Automotive',
    _id: "64de67326fc0bfd371994f27",
    __v: 0
  }
];


// function getRandomCategoryId() {
//   const randomIndex = Math.floor(Math.random() * categories.length);
//   return categories[randomIndex]._id;
// }

// // Assign a random category to each product
// const productsWithCategories = productsData.map(product => ({
//   ...product,
//   category: getRandomCategoryId()
// }));

// console.log(productsWithCategories);




