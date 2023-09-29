const express = require("express");
const mongoose = require("mongoose");
const RestaurantModels = require("./models/Restaurant");
const RecinsioneModels = require("./models/Recinsione");
var cors = require('cors')

const host = "127.0.0.1";
const port = 4000;



const app = express();
app.use(cors())                  
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect('mongodb+srv://bberenge:panco13its@cluster0.rqzf7em.mongodb.net/Mr-Restaurant', {useNewUrlPrse: true}, () => {
    console.log("Im connected to the database successfully!");
})

app.listen(port, host, () => {
    console.log(`Im daamn connected at the door ${port}`)
})


// --------------- Apis----------------

app.get("/Restaurant/list", async (req, res) => {
    let list = await RestaurantModels.find({})    
    res.json( list );
})

app.get("/Restaurant/details/:ristId", async (req, res) => {
    let varId = req.params.ristId

    try {
        let rist = await RestaurantModels.findById(varId);
        let rece = await RecinsioneModels.find({ RestaurantId: rist._id});
        res.json( {rist, rece});
    } catch (error) {
        res.json( null )
    }
    
});

app.post("/Restaurant/save", async (req, res) => {
    let rist = {
        name: req.body.name,
        address: req.body.address,
        typeOfFood: req.body.typeOfFood,
        immagine: req.body.immagine,
        posizione: req.body.posizione
      
    }

    try {
        let result = await RestaurantModels.create(rist);
        res.json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.json({
            status: "error",
            data: error
        })
    }
})


// ---------------Recinsione----------------

app.get("/Recinsione/list", async (req, res) => {
    let list = await RecinsioneModels.find({})    
    res.json( list );
})

app.get("/Recinsione/details/:receId", async (req, res) => {
    let varId = req.params.receId

    try {
        let rece = await RecinsioneModels.findById(varId);
        res.json( rece );
    } catch (error) {
        res.json( null )
    }
    
}) 

app.post("/Recinsione/save", async (req, res) => {
    let rece = {
        RestaurantId: req.body.RestaurantId,
        autore: req.body.autore,
        vote: req.body.vote,
        price: req.body.price,
    }

    try {
        let result = await RecinsioneModels.create(rece);
        res.json({
            status: "success",
            data: result
        })
    } catch (error) {
        res.json({
            status: "error",
            data: error
        })
    }
})