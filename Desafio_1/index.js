class ProductManager {

  constructor() {
    this.products = []
  }

  addProduct(title, description, price, thumbnail, code, stock){
    if(!title || !description || !price || !thumbnail  || !code || !stock ){
        console.log('Falta algun campo')
    } else {
        const product = this.#codeEval(code)
        if(product){
            console.log('ya existe codigo')
        } else {
            const product = {
                    id: this.#createId(),
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
            }
            this.products.push(product)
            console.log('Producto agregado con exito')
        }
    }
  }

  getProducts(){
    return this.products
  }

  getProductById(idProduct){
    const product = this.#productEval(idProduct)
    if(product){
        return product
    } else {
        console.log('Not found')
    }
  }

  #createId(){
    let id = 1
    if (this.products.length!==0){
        id = this.products[this.products.length-1].id + 1
    }
    return id
  }

  #codeEval(code) {
    return this.products.find((product) => product.code === code)
  }

  #productEval(idProduct){
    return this.products.find((product) => product.id === idProduct)
  }
}


const ProductManager1 = new ProductManager()
ProductManager1.addProduct('cafe', 'cafe en polvo', 800, 'sin imagen', 1234, 20)
ProductManager1.addProduct('yerba', 'yerba mate', 305, ' ', 1235, 11)
ProductManager1.addProduct('yerba', 'yerba mate', 305, ' ', 1235, 11)
ProductManager1.addProduct('azucar', 'azucar refinada', 1236, 11)
ProductManager1.addProduct('cafe', 'cafe en sobre', 540, 'imagen', 234, 250)
ProductManager1.addProduct('agua', 'agua en botella', 105, ' ', 138, 19)
ProductManager1.addProduct('edulcorante', 'edulcorante', 50, ' ', 125, 11)
ProductManager1.addProduct('azucar', 'azucar refinada de otra marca', 135, 100)

console.log(ProductManager1.getProducts())