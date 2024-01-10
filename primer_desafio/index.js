const prompt = require("prompt-sync")();
const pause = () => prompt("(press ENTER to contine...)");

class Product {
  constructor(_id, _title, _description, _price, _thumbnail, _code, _stock) {
    this.id = _id;
    this.title = _title;
    this.description = _description;
    this.price = _price;
    this.thumbnail = _thumbnail;
    this.code = _code;
    this.stock = _stock;
  }
  getProduct() {
    return {
      title: this.title,
      description: this.description,
      price: this.price,
      thumbnail: this.thumbnail,
      code: this.code,
      stock: this.stock,
    };
  }
}

class ProductManager {
  constructor() {
    this.products = [
      {
        id: 1,
        title: "Product 1",
        description: "Description product 1",
        price: "Price product 1",
        thumbnail: "Thumbnail product 1",
        code: "Code product 1",
        stock: "Stock product 1",
      },
      {
        id: 2,
        title: "Product 2",
        description: "Description product 2",
        price: "Price product 2",
        thumbnail: "Thumbnail product 2",
        code: "Code product 2",
        stock: "Stock product 2",
      },
      {
        id: 3,
        title: "Product 3",
        description: "Description product 3",
        price: "Price product 3",
        thumbnail: "Thumbnail product 3",
        code: "Code product 3",
        stock: "Stock product 3",
      },
    ];
  }
  addProduct(elem) {
    this.products.push(elem);
  }
  getProducts() {
    this.products.forEach((e) => {
      console.log(e);
    });
  }
  getProductById(_id) {
    console.log(this.products.find((e) => e.id === _id));
  }
  getData() {
    return this.products;
  }
}

pManager = new ProductManager();
// prettier-ignore
function menu() {
  let bucle = false;
  let opcion;
  while (!bucle) {
    console.log(
      `
       *-------------------------------*
       |--------ONLINE MARKETS --------|
       *-------------------------------*
       |     1. Add Product            |
       |     2. Get Products           |
       |     3. Get Product by Id      |                    
       |     4. Exit                   |                    
       *-------------------------------*
      `,
    );
    opcion = parseInt(prompt(` --> `));
    console.clear();
    switch (opcion) {
      case 1:
        console.log("\n");
        let code = prompt(" Enter the code: ");
        if(pManager.getData().some((e) => e.code === code)) {
          console.log(" The code already exists in the system");
        } else {
          let title = prompt(" Enter the title: ");
          let description = prompt(" Enter the description: ");
          let price = prompt(" Enter the price: ");
          let thumbnail = prompt(" Enter the thumbnail: ");
          let stock = prompt(" Enter the stock: ");
          pManager.addProduct(new Product(pManager.getData().length + 1, title, description, price, thumbnail, stock));
          console.log(" The product was added successfully");
        }
        pause();
        break;
      case 2:
        console.log("\n");
        pManager.getProducts();
        pause();
        break;
      case 3:
        console.log("\n");
        let id = parseInt(prompt(" Enter the id: "));
        if(pManager.getData().some((e) => e.id === id)){
          pManager.getProductById(id);
        } else{
          console.log(" The product doesn't exist");
        }
        pause();
        break;
      case 4:
        bucle = true;
        break;
      default:
        console.log("Wrong option\n");
        pause();
        break;
    }
    console.clear();
  }
}

menu();
