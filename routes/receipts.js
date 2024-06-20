const express = require("express");
const receiptsData = require("../data/receipts")
const helpers = require("../data/helpers")
const xss = require('xss');


const Router = express.Router();
Router.post("/process",async (req,res)=>{
        let body = req.body;
        let retailer = xss(body.retailer);
        let purchaseDate = xss(body.purchaseDate);
        let purchaseTime = xss(body.purchaseTime);
        let items = body.items
        console.log(items)
        let total = xss(body.total);

        if(!retailer){
            res.status(400).json({error:'No Retailer was provided'});
            return
        }
        if(!purchaseDate){
            res.status(400).json({error:'No Purchase Date was provided'});
            return
        }
        if(!purchaseTime){
            res.status(400).json({error:'No Purchase Time was provided'});
            return
        }
        if(!items){
            res.status(400).json({error:'No Items were provided'});
            return
        }
        if(!total){
            res.status(400).json({error:'No  Total was provided'});
            return
        }
        if(typeof retailer !='string'){
            res.status(400).json({error:'Retailer provided is not a string'});
            return
        }
        if(typeof purchaseDate !='string'){
            res.status(400).json({error:'Retailer provided is not a string'});
            return
        }
        if(typeof purchaseTime !='string'){
            res.status(400).json({error:'purchaseTime provided is not a string'});
            return
        }
        if(!Array.isArray(items)){
            res.status(400).json({error:'Items provided is not an array'});
            return
        }
        if(typeof total !='string'){
            res.status(400).json({error:'Total provided is not a string'});
            return
        }
        if(!/^[\w\s&-]+$/.test(retailer)){
            res.status(400).json({error:'Retailer provided is not in the right format'});
            return
        }
        if(!helpers.isDateValid(purchaseDate)){
            res.status(400).json({error:'Purchase Date provided is not a valid date'});
            return
        }
        if(!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(purchaseTime)){
            res.status(400).json({error:'Purchase Time provided is not a valid time'});
            return
        }

        if(items.length <= 0){
            res.status(400).json({error:'Items provided is an empty array'});
            return
        }
        for (let i in items){
            let shortDescription = xss(items[i].shortDescription);
            let price = xss(items[i].price);
            console.log(price)
            if(!shortDescription){
                res.status(400).json({error:'No Short Description was provided'});
                return
            }
            if(!price){
                res.status(400).json({error:'No Price was provided'});
                return
            }
            if(typeof shortDescription !='string'){
                res.status(400).json({error:'Short Description provided is not a string'});
                return
            }
            if(typeof price !='string'){
                res.status(400).json({error:'Price provided is not a string'});
                return
            }
            if(!/^[\w\s&-]+$/.test(shortDescription)){
                res.status(400).json({error:'Short Description provided is not a valid Short Description'});
                return
            }
            price = price.trim();
            if(!/^\d+\.\d{2}$/.test(price)){
                res.status(400).json({error:'Price provided is not a valid Price'});
                return
            }
        }
        total = total.trim();
        if(!/^\d+\.\d{2}$/.test(total)){
            res.status(400).json({error:'Price provided is not a valid Price'});
            return
        }
        let receipt =
        {
            "retailer": retailer,
            "purchaseDate": purchaseDate,
            "purchaseTime": purchaseTime,
            "items": items,
            "total": total
        }

        let id = await receiptsData.processReceipt(receipt);

        if(!id){
            res.status(400).json({error:'Error processing receipt'});
            return
        }

        res.status(200).json({id: id});
        
    
})

Router.get("/:id/points",async (req,res)=>{
    let id = xss(req.params.id);

    if(!id){
        res.status(400).json({error:'No Id was provided'});
        return
    }
    if(typeof(id)!="string"){
        res.status(400).json({error:'Id provided is not a string'});
        return
    }
    let points = await receiptsData.getPoints(id)
    if(!points){
        res.status(400).json({error:'A record does not exist for the provided Id'});
        return
    }

    res.status(200).json({points: points})

})


module.exports = Router