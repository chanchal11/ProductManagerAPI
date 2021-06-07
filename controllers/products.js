var router = require('express').Router();

const { paginate, newObjectWithoutFalsyValues } = require('../utility');
const { models } = require('../models');

router.get('/', async function(req, res){
    try {
        const { productName, pageNumber, pageLimit } = req.query;
        const products = await paginate(models, pageNumber, pageLimit, productName);
        if(products.length == 0)
            res.status(404).send({error: true,message: 'no product found.'});
        else
            res.send(products);        
    } catch (error) {
        res.status(400).send({error: true,message: 'bad input.'});
        console.error(error);
    }
});

router.get('/:id', async function(req, res){
    try {
        const product = await models.product.findOne({
            where: {id: req.params.id},
            include: models.category 
        });
        if(product != null)
            res.send(product);
        else
            res.status(404).send({error: true,message: 'not found.'});
    } catch (error) {
        res.status(400).send({error: true,message: 'bad input.'});
    }
});

router.post('/', async function(req, res){

    try {
        const { name, description, price, expiryDate, categoryName } = req.body;
    
        const category = await models.category.findOne({
            where: {name: categoryName} 
        });
        
        if(category && category.id){
            const product =  await models.product.create({
                name, description, price, expiryDate, categoryId : category.id 
            });
            if(product){
                res.send({success: true, product});
            }else{
                res.status(400).send({success: false});
            }    
        }else{
            res.status(400).send({success: false});
        } 
    
    } catch (error) {
        console.log(error.message); 
        res.status(400).send({success: false});       
    }
    
});

module.exports = router;