const fs = require('fs')

class ProductManager {
  constructor(path) {
    this.path = path
    this.products = []
  }

  async addProduct(product){
    try {
      const productsFile = await this.getProducts()
      const code = productsFile.find(c => c.code === product.code)
      if(productsFile == []){
        product.id = 1
      }
      else{
        product.id = productsFile.length+1
      }      
      if (code){
        console.log('ya existe código')
      }
      else{
        productsFile.push(product)
        await fs.promises.writeFile(this.path,JSON.stringify(productsFile))
      }
    } catch (error){
        console.log(error)
    }
  }
  
  async getProducts(){
    try{
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        const productsJS = JSON.parse(products)
        return productsJS
      } else {
        return []
      }    
    }catch (error){
      console.log(error)
    }
  }

  async getProductById(idProduct){
    try{
      const productsFile = await this.getProducts()
      const producto = productsFile.find(p => p.id === idProduct)
    if(producto){
        return producto
    } else {
        console.log('Product Not found')
    }
    }catch(error){
      console.log(error)
    }
  }

  async updateProduct(id, updates) {
    try {
      const productsFile = await this.getProducts()
      const productIndex = productsFile.findIndex(p => p.id === id)
      if(productIndex !== -1){
        productsFile[productIndex] = { ...productsFile[productIndex], ...updates }
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
      } else {
        console.log('Product Not found')
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const productsFile = await this.getProducts()
      const productIndex = productsFile.findIndex(p => p.id === id)
      if(productIndex !== -1){
        productsFile.splice(productIndex, 1);  
      } else {
        console.log('Product Not found')
      }
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
    } catch (error) {
      console.error(error);
    }
  }

}

///////////////////////// TEST ///////////////////
const path = './products.json';
const productManager = new ProductManager(path);

async function test_get_products(){
  const consultarProductos = await productManager.getProducts()
  console.log(consultarProductos)
}

async function test_add_product(product){
  productManager.addProduct(product)
}

async function test_get_product_by_id(idprod){
  const consultarProductosxId = await productManager.getProductById(idprod)
  console.log(consultarProductosxId)
}

async function test_update_product(idprod, keyValue){
  productManager.updateProduct(idprod, keyValue)
}

async function test_delete_product(idprod){
  productManager.deleteProduct(idprod)
}

const productA = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
}

//test_get_products()
test_add_product(productA)
//test_get_product_by_id(2)
//test_delete_product(3);
//test_update_product(2,  { price: 150 })

