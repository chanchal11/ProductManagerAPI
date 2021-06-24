var router = require('express').Router();

const { paginate, newObjectWithoutFalsyValues } = require('../utility');
const { models, model } = require('../models');

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

router.delete('/:id', async function(req, res){
    try {
        const numOfRows = await models.product.findOne({
            where: {id: req.params.id} 
        });
        if(numOfRows != null)
            res.send({id: req.params.id });
        else
            res.status(404).send({error: true,message: 'not found.'});
    } catch (error) {
        res.status(400).send({error: true,message: 'bad input.'});
    }
});

router.post('/', async function(req, res){

    try {
        const { name, description, price, expiryDate, categoryName, image } = req.body;
    
        const category = await models.category.findOne({
            where: {name: categoryName} 
        });
        
        if(category && category.id){
            if(image){
                await models.category.update({image},{where: {id:category.id}});
            }
            const product =  await models.product.create({
                name, description, price, expiryDate, categoryId : category.id 
            });
            if(product){
                res.send({success: true, product});
            }else{
                res.status(400).send({success: false});
            }    
        }else{
            const respCategory = await models.category.create({name: categoryName,image});
            const product =  await models.product.create({
                name, description, price, expiryDate, categoryId : respCategory.id 
            });
            if(product){
                res.send({success: true, product});
            }else{
                res.status(400).send({success: false});
            }
        } 
    
    } catch (error) {
        console.log(error.message); 
        res.status(400).send({success: false});       
    }
    
});

router.put('/:id', async function(req, res){

    try {
        let { name, description, price, expiryDate, categoryName, image } = req.body;
        const { id } = req.params;
        const category = await models.category.findOne({
            where: {name: categoryName},
            include: [{model: models.product,where: {id} }] 
        });
        
        if(category && category.id){
            await models.category.update(newObjectWithoutFalsyValues({image,name:categoryName}),{where: {id:category.id}});
            const product =  await models.product.update({
                name, description, price, expiryDate, categoryId : category.id 
            },{where: {id} });
            if(product){
                res.send({success: true, product});
            }else{
                res.status(400).send({success: false});
            }    
        }else{
            if(!image) image = 'https://i.stack.imgur.com/y9DpT.jpg';
            const respCategory = await models.category.create({name: categoryName,image});
            const product =  await models.product.update({
                name, description, price, expiryDate, categoryId : respCategory.id 
            },{where: {id: productId}});
            if(product){
                res.send({success: true, product});
            }else{
                res.status(400).send({success: false});
            }
        } 
    
    } catch (error) {
        console.log(error); 
        res.status(400).send({success: false});       
    }
    
});

module.exports = router;