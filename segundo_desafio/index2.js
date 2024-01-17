// use prompt with node
const prompt = require('prompt-sync')();
const fs = require('fs');
const archivo = './Products.json';

// Producto a gestionar
class Product {
  constructor(title, description, price, thumbnail, code, stock){
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
  getData(){
    const product = {
      title: this.title,
      description: this.description,
      price: this.price,
      thumbnail: this.thumbnail,
      code: this.code,
      stock: this.stock,
    } 
    return product;
  }
}

// manager de los productos
class ProductManager {
  static id;
  constructor() {
    this.id = 0;
    this.products = [];
  }

  async recoverData(){
    if(fs.existsSync(archivo)){
      const content = await fs.promises.readFile(archivo, 'utf-8');
      this.products = await JSON.parse(content);
      const aux = this.products.at(-1);
      this.id = aux[0] + 1;
    }
  }

  async addProduct(product){
    try{
      if(!fs.existsSync(archivo)){
        this.products.push([this.id, product]);
        this.id++;
        await fs.promises.writeFile(archivo, JSON.stringify(this.products, null, '\t'));
      } else {
        this.products.push([this.id, product]);
        this.id++;
        await fs.promises.writeFile(archivo, JSON.stringify(this.products, null, '\t'));
        console.log("Product added successfully");
      }
    } catch(error){
      console.log(error);
    }    
  } 

  getProducts(){
    return this.products;
  }

  getProductById(id){
    for(let i = 0; i < this.products.length; i++){
      const product = this.products[i];
      if(product[0] === id) return product;
    }
    return "Wrong ID or not found";
  }

  async updateProduct(id, data){
    try{
      for(let i = 0; i < this.products.length; i++){
        const product = this.products[i];
        if(product[0] === id) {
          this.products[i][1] = data; 
          await fs.promises.writeFile(archivo, JSON.stringify(this.products, null, '\t'));
          return "Product updated successfully";
        } 
      }
      return "Wrong ID or not found";
    } catch(error){
      console.log(error);
    } 
  }

  async deleteProduct(id){
    try{
      let aux = this.products; 
      if(aux.find(data => data[0] === id)){
        this.products = aux.filter(data => data[0] != id);
        this.id--;
        await fs.promises.writeFile(archivo, JSON.stringify(this.products, null, '\t'))
        return "Product deleted successfully";
      } else {
        return "Enter a correct ID";
      }
  } catch(error){
      console.log(error);
    }
  }
}


// Example
// manager de productos
const manager = new ProductManager();

// generate data
/*const generateData = async () => {
  const product1 = new Product("Product 1", "Description 1", 100, "img/", "Code 1", "Stock 1");
  const product2 = new Product("Product 2", "Description 2", 100, "img/", "Code 2", "Stock 2");
  const product3 = new Product("Product 3", "Description 3", 100, "img/", "Code 3", "Stock 3");
  await manager.addProduct(product1.getData());
  await manager.addProduct(product2.getData());
  await manager.addProduct(product3.getData());
}*/


const mainAsync = async () => {
  await manager.recoverData();
  let aux1, aux2, aux3, aux4, aux5, aux6;
  let auxid;
  let auxEnter;
  let auxProduct;
  let option = 0;
  let bucle = false;
  while (!bucle){
    console.clear();
    do{
        console.log("\n",
        "*********************************************\n",
        "---------------PRODUCT MANAGER---------------\n",
        "*********************************************\n",
        "* Options:                                  *\n",
        "* 1. View products                          *\n",
        "* 2. Add product                            *\n",
        "* 3. View product by ID                     *\n",
        "* 4. Update product                         *\n",
        "* 5. Delete product by ID                   *\n",
        "* 6. Exit program                           *\n",
        "*********************************************\n");
        option = parseInt(prompt("Enter your option: "));
        if (option < 1 || option > 6) {
          //setTimeout(() => {console.log("Please enter a valid option!")}, 1500);
        console.log("Please enter a valid option!");
        auxEnter = prompt("Press enter to continue:");
          console.clear();
        }
    }while(!(option >= 1 && option <= 6));
    console.clear();
    switch (option) {
      case 1:
        console.clear();
        console.log("\n",
          "*********************************************\n",
          "------------MENU VIEWING PRODUCTS------------\n",
          "*********************************************\n");
        console.log(manager.getProducts());
        auxEnter = prompt("Press enter to continue:");
        break;
      case 2:
        console.log("\n",
          "*********************************************\n",
          "------------MENU ADDING PRODUCTS-------------\n",
          "*********************************************\n");
        console.log(" Enter the product data:\n");
        aux1 = prompt("Title: ");
        aux2 = prompt("Description: ");
        aux3 = prompt("Price: ");
        aux4 = prompt("Image: ");
        aux5 = prompt("Code: ");
        aux6 = prompt("Stock: ");
        await manager.addProduct(new Product(aux1, aux2, aux3, aux4, aux5, aux6));
        auxEnter = prompt("Press enter to continue:");
        break;
      case 3:
        console.log("\n",
          "*********************************************\n",
          "---------MENU VIEWING PRODUCTS BY ID---------\n",
          "*********************************************\n");
        auxid = parseInt(prompt("Enter the product ID: "));
        console.log(manager.getProductById(auxid));
        auxEnter = prompt("Press enter to continue:");
        break;
      case 4:
        console.log("\n",
          "*********************************************\n",
          "---------MENU UPDATING PRODUCTS BY ID--------\n",
          "*********************************************\n");
        auxid = parseInt(prompt("Enter the product ID: "));
        console.log(manager.getProductById(auxid));
        console.log(" Enter the new product data:\n");
        aux1 = prompt("Title: ");
        aux2 = prompt("Description: ");
        aux3 = prompt("Price: ");
        aux4 = prompt("Image: ");
        aux5 = prompt("Code: ");
        aux6 = prompt("Stock: ");
        console.log(await manager.updateProduct(auxid, new Product(aux1, aux2, aux3, aux4, aux5, aux6)));
        auxEnter = prompt("Press enter to continue:");
        break;
      case 5:
        console.log("\n",
          "*********************************************\n",
          "---------MENU DELETING PRODUCTS BY ID--------\n",
          "*********************************************\n");
        auxid = parseInt(prompt("Enter the product ID: "));
        console.log(manager.getProductById(auxid));
        console.log(await manager.deleteProduct(auxid));
        auxEnter = prompt("Press enter to continue:");
        break;
      case 6:
        console.log("See you later!");
        //setTimeout(() => {console.log("See you later!")}, 1000);
        auxEnter = prompt("Press enter to continue:");
        bucle = true;
        break;
    } 
  }
}

//Llamada a la funcion principal
//generateData();
mainAsync();
