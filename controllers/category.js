var router = require('express').Router();

const { paginate, newObjectWithoutFalsyValues } = require('../utility');
const { models } = require('../data');

router.get('/', async function(req, res){
    try {
        const categories = await models.category.findAll();
        if(categories.length == 0)
            res.status(404).send({error: true,message: 'no product found.'});
        else
            res.send(categories);        
    } catch (error) {
        res.status(400).send({error: true,message: 'bad input.'});
        console.error(error);
    }
});

router.get('/:id', async function(req, res){
    try {
        const category = await models.category.findOne({
            where: {id: req.params.id} 
        });
        if(category != null)
            res.send(category);
        else
            res.status(404).send({error: true,message: 'not found.'});
    } catch (error) {
        res.status(400).send({error: true,message: 'bad input.'});
    }
});

router.post('/', async function(req, res){

    try {
        const { name, image} = req.body;

        
        const category =  await models.category.create({
            name, image 
        });
        if(category){
            res.send({success: true, category});
        }else{
            res.status(400).send({success: false});
        }    
        
    
    } catch (error) {
        console.log(error.message); 
        res.status(400).send({success: false});       
    }
    
});

module.exports = router;