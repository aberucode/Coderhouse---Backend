const fs = require('fs');
const archivo = './src/Products.json';

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

class ProductManager {
  static id;
  constructor() {
    this.id = 0;
    this.products = [];
  }

  updateID(){
    const aux = this.products.at(-1);
    this.id = aux[0] + 1;
  }

  async recoverData(){
    if(fs.existsSync(archivo)){
      const content = await fs.promises.readFile(archivo, 'utf-8');
      this.products = await JSON.parse(content);
      this.updateID();
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

  // Usando el recover data
  getProducts(){
    return this.products;
  }

  getProductById(id){
    const product = this.products.find(data => data[0] === id);
    if(product) return product;
    return "Wrong ID or not found";
  }

  // Sin recover data
  async getProductos(){
    try{
      if(fs.existsSync(archivo)){
        const content = await fs.promises.readFile(archivo, 'utf-8');
        this.products = await JSON.parse(content);
        this.updateID();
        return this.products;
      }
    } catch{
      console.log(error);
    }
  }

  async getProductoById(id){
    try{
      if(fs.existsSync(archivo)){
        const content = await fs.promises.readFile(archivo, 'utf-8');
        this.products = await JSON.parse(content);
        this.updateID();
        const product = this.products.find(data => data[0] === id);
        if(product) return product;
        return "Wrong ID or not found";
      }
    } catch{
      console.log(error);
    }
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
        await fs.promises.writeFile(archivo, JSON.stringify(this.products, null, '\t'))
        this.updateID();
        return "Product deleted successfully";
      }
      return "Enter a correct ID";
  } catch(error){
      console.log(error);
    }
  }
}

module.exports = ProductManager;
