const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 8080;

const productManager = new ProductManager('products.json');

app.use(express.json());


// solucion al cannot /get ?
app.get("/", (req, res)=>{
    res.send("Bienvenidos al index");
});

// Buscar todos los productos o un número específico de productos
app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        if (isNaN(limit)) {
            const products = await productManager.getAllProducts();
            res.json(products);
        } else {
            const products = await productManager.getAllProducts(limit);
            res.json(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Buscar un producto por su id
app.get('/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'El producto no existe' });
    }
});

// Arranca el server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
