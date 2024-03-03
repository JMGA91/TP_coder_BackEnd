const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    getAllProducts(limit = null) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    reject('Error interno del servidor');
                } else {
                    const products = JSON.parse(data);
                    if (limit) {
                        resolve(products.slice(0, limit));
                    } else {
                        resolve(products);
                    }
                }
            });
        });
    }

    getProductById(productId) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    reject('Error interno del servidor');
                } else {
                    const products = JSON.parse(data);
                    const product = products.find(p => p.id === productId);
                    if (product) {
                        resolve(product);
                    } else {
                        reject('El producto no existe');
                    }
                }
            });
        });
    }
}

module.exports = ProductManager;