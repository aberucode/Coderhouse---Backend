const prompt = require('prompt-sync')();
const express = require('express');
const ProductManager = require('./ProductManager.js');
const manager = new ProductManager();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  const productos = await manager.getProductos();
  console.clear();
  console.log("\n",
    "*********************************************\n",
    "------------MENU VIEWING PRODUCTS------------\n",
    "*********************************************\n");
  if (limit) {
    console.log(productos.slice(0, limit));
    return res.send(productos.slice(0, limit));
  }
  console.log(productos);
  res.send(productos);
});

app.get('/products/:pid', async (req, res) => {
  const id = parseInt(req.params.pid, 10);
  const producto = await manager.getProductoById(id); 
  console.clear();
  console.log("\n",
    "*********************************************\n",
    "---------MENU VIEWING PRODUCTS BY ID---------\n",
    "*********************************************\n");
  if(producto !== "Wrong ID or not found"){
    console.log(producto);
    return res.send(producto);
  }
  console.log(producto);
  res.send(`${producto}`);
});

app.listen(2090, () => {
  console.log("servidor levantado")
});


