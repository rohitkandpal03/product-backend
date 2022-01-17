
const express = require('express');
const router = express.Router();
const data = require('../../DatabaseData.js');


const selectPagination = ( page, perPage ) => {
    const startIndex = ( page * perPage ) - perPage;
    const endIndex = page * perPage
    const productChunk = [...data].reverse().slice(startIndex , endIndex)
    return productChunk;
}

router.get('/totalProducts', ( req, res ) => {
    res.status(200).send({totalLength: Math.ceil(data.length/5)});
})

router.post('/add', (req, res) => {
    const { productDetail } = req.body;
    if(productDetail.productName && productDetail.amount && productDetail.description){
        data.push(productDetail);
        res.status(201).send("Product Created");
    }else{
        res.status(404).send("");
    }
   
})

router.get('/searchDate', (req, res) => {
    const { date, searchData } = req.query;
    if( date ){
        const products = data.filter( productData => {
            const search = productData.createdAt === date;
            if(searchData){
                return ( search && productData.productName.toLowerCase().startsWith(searchData.toLowerCase()));
            }
            return search ;
        });
        const productData = {
            products,
            totalLength: Math.ceil(products.length/5)
        }
        res.status(200).send(productData);
    } else{
        res.status(400).send([]);
    }
    
});

router.get('/searchProduct', (req, res) => {
    const { searchPrName, date } = req.query;
    if( searchPrName ){
        const products = data.filter( productData => {
            const search = productData.productName.toLowerCase().startsWith(searchPrName.toLowerCase());
            if( date ){
                return ( search && (productData.createdAt === date));
            }
           return search;
        });
        const productData = {
            products,
            totalLength: Math.ceil(products.length/5)
        }
        res.status(200).send(productData); 
    }
    else{
        res.status(400).send([]);
    }
    
})

router.get('/paginate', ( req, res ) => {
    const { perPage, page} = req.query ;
    if(perPage && page){
        const showPages = selectPagination( page, perPage )
        res.send(showPages);
    }else{
        res.status(400).send('');
    }
    
})

module.exports = router;