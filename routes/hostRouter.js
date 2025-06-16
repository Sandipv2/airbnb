const express = require('express');
const hostRouter = express.Router();
const fs = require('fs');

hostRouter.get('/add-home',(req, res) => {
    res.render('registerHome')
})

hostRouter.post('/add-home',(req, res) => {
    try {
        const homes = fs.readFileSync('homes.json');
        let homesArr = JSON.parse(homes);
        homesArr.push({homeName: req.body.homeName});
        fs.writeFileSync('homes.json',JSON.stringify(homesArr));
    } catch(err) {
        console.log('homes.json file not exists')
        fs.writeFileSync('homes.json',JSON.stringify([{homeName: req.body.homeName}]))
    }


    res.render('addedHome',{homeName: req.body.homeName})
})

hostRouter.get('/show-homes',(req, res) => {
    let homes = [];
    try {
        const homesData = fs.readFileSync('homes.json');
        homes = JSON.parse(homesData)
    }
    catch(err) {
    }
    
    res.render('homeList', {homes})
})

module.exports = hostRouter;