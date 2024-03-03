const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;

// Middleware para manejar el body de las peticiones
app.use(express.json());

// Ruta para obtener todos los productos o un número específico de productos
app.get('/products', (req, res) => {
    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        const products = JSON.parse(data);
        const limit = parseInt(req.query.limit);

        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    });
});

// Ruta para obtener un producto por su id
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    fs.readFile('products.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        const products = JSON.parse(data);
        const product = products.find(p => p.id === productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'El producto no existe' });
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
