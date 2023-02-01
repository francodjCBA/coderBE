import express from 'express'
import ProductManager from './PorductManager.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager('../products.json')

app.get('/products', async (req, res) => {
    const {limit} = req.query

    let products = await productManager.getProducts()

    if (limit) {
        products = products.slice(0, parseInt(limit));
      }

      res.json({ products })
})

app.get('/products/:pid', async (req, res) => {
    const {pid} = req.params
    const products = await productManager.getProductById(parseInt(pid))
    if (!products) {
        return res.status(404).json({
          error: "Product not found",
        })
      }
    res.json({ products })
})

app.listen(8080, () => {
  console.log('Servidor escuchando al puerto 8080');
});
