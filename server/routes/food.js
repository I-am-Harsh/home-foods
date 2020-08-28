var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipeModel');

const getMethod = (data) => {
    // separate on basis of item
    const item = data.split(";");

    // separate different instructions
    const methodArray = [];
    for(let i = 0; i < item.length; i++){
        const methodIns =  item[i].split(',').map(item => item.trim());
        
        const methodInsObj = {
            name : methodIns[0].substring(1,methodIns[0].length - 1),
            instruction : []
        }

        for(let j = 1; j < methodIns.length; j++){
            methodInsObj['instruction'].push(methodIns[j])
        }
        methodArray.push(methodInsObj);
    }

    return methodArray;
}

const dateConvert = (text) => {
    const splitDate = text.split('/')
    const date = new Date(splitDate[2], splitDate[1] -1, splitDate[0]);
    return date;
}

router

// initial fetch
// only 9
.get('/', (req, res) => {
    Recipe.find({}).sort({_id : -1}).limit(3)
    .then((result) => {
        res.json({success : true, result : result})
    })
    .catch(err => res.json({success : false, result : err}));
})

// all
.get('/recipes/:skip', (req, res) => {
    Recipe.find({})
    .sort({_id : -1})
    .skip(parseInt(req.params.skip))
    .limit(3)
    .then((result) => {
        console.log(result);
        if(result){
            res.json({success : true, result : result})
        }
        else{
            res.json({success : true, result : false});
        }
    })
    .catch(err => res.json({success : false, result : err}));
})

// get specific dish

.get('/:name', (req, res) => {
    let dishName = req.params.name
    Recipe.findOne({url : dishName})
    .then((result) => {
        res.json({success : true, result : result})
    })
    .catch(err => res.json({success : false, result : err}));
})

// upload recipe
.post('/recipes/upload', (req, res) => {
    const { method, ingredients, date } = req.body;

    // split into array
    req.body.method = getMethod(method);

    // ingredients
    req.body.ingredients = getMethod(ingredients);

    req.body.date = dateConvert(date);

    Recipe.create(req.body)
    .then(result => {
        res.json({success : true, result : result});
    })
    .catch(err => res.json({success : false, result : err}));
})

module.exports = router;