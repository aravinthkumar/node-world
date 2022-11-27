const products = [];
const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(require.main.filename), 'data', 'package.json');

const getProductsFromFile = callback => {
    fs.readFile(p, (err, fileContent) => {
        let products = [];
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
};