const redis = require('redis');
const bluebird = require('bluebird');
const client = require("../redisClient")
console.log(`REDIS_HOST: ${process.env.REDIS_HOST}`);
console.log(`REDIS_PORT: ${process.env.REDIS_PORT}`);
client.connect()
const helpers = require("../data//helpers")
const { uuid } = require('uuidv4');


async function processReceipt(receipt){
    let retailer = receipt.retailer;
    let purchaseDate = receipt.purchaseDate;
    let purchaseTime = receipt.purchaseTime;
    let items = receipt.items;
    let total = receipt.total;
    
    try{
        if(!retailer){
            throw 'No Retailer was provided'
        }
        if(!purchaseDate){
            throw'No Purchase Date was provided'
        }
        if(!purchaseTime){
            throw'No Purchase Time was provided'
        }
        if(!items){
            throw'No Items were provided'
        }
        if(!total){
            throw'No  Total was provided'
        }
        if(typeof retailer !='string'){
            throw'Retailer provided is not a string'
        }
        if(typeof purchaseDate !='string'){
            throw'Retailer provided is not a string'
        }
        if(typeof purchaseTime !='string'){
            throw 'purchaseTime provided is not a string'
        }
        if(!Array.isArray(items)){
            throw'Items provided is not an array';
        }
        if(typeof total !='string'){
            throw'Total provided is not a string';
        }
        if(!/^[\w\s&\-]+$/.test(retailer)){
           throw'Retailer provided is not in the right format';
        }
        if(!helpers.isDateValid(purchaseDate)){
            throw'Purchase Date provided is not a valid date';
        }
        if(!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(purchaseTime)){
            throw'Purchase Time provided is not a valid time';
        }

        if(items.length <= 0){
            throw'Items provided is an empty array';
        }
        for (let i in items){
            let shortDescription = items[i].shortDescription;
            let price = items[i].price;
            if(!shortDescription){
                throw'No Short Description was provided'
            }
            if(!price){
                throw'No Price was provided'
            }
            if(typeof shortDescription !='string'){
                throw'Short Description provided is not a string'
            }
            if(typeof price !='string'){
                throw'Price provided is not a string'
            }
            if(!/^[\w\s&-]+$/.test(shortDescription)){
                throw'Short Description provided is not a valid Short Description'
            }
            price = price.trim();
            if(!/^\d+\.\d{2}$/.test(price)){
                throw'Price provided is not a valid Price'
            }
        }
        total = total.trim();
        if(!/^\d+\.\d{2}$/.test(total)){
            throw'Price provided is not a valid Price'
        }
        let id = uuid();
        let idUnique = false;
        while(!idUnique){
            let temp = await client.hGetAll(id)
            console.log(temp.retailer)
            if(temp.retailer){
                id = uuid();
            }
            else{
                idUnique = true;
            }
        }
        
       let result = await client.hSet(id,{
            "retailer": retailer,
            "purchaseDate": purchaseDate,
            "purchaseTime": purchaseTime,
            "items": JSON.stringify(items),
            "total": total
        });
        console.log(result)
        
        return id;
    }catch(e){
        console.log("Error processing receipt: " + e);
    }

}

async function getPoints(id){
    try{
        if(!id){
            throw'No Id was provided'
        }
        if(typeof(id)!="string"){
            throw'Id provided is not a string';
        }
        let points = 0;
        let keys = await client.keys("*");
        console.log(keys)
        if(!keys.includes(id))throw "A receipt with the id provided does not exist"

        let record = await client.hGetAll(id);
        
        record.items = JSON.parse(record.items);
        console.log(record)
        

        points += helpers.getAlphanumericCharacters(record.retailer);

        if(record.total.split(".")[1] == "00"){
            console.log("Round Dollar Total: 50 points have been added.");
            points += 50;
        } 

        if(helpers.isMultipleOfQuarter(parseFloat(record.total))) points += 25

        points += helpers.everyTwoItems(record.items);

        points += helpers.getTrimmedValue(record.items)
        if(parseInt(record.purchaseDate.split("-")[2])% 2 !== 0){
            console.log("Odd Date: 6 points have been added")
            points += 6
        }
            let splitTime = record.purchaseTime.split(":")
            if(parseInt(splitTime[0])  == 14){
                if(parseInt(splitTime) !=0){
                    console.log("Purchase Time Within 2pm and 4pm: 10 points have been added.")
                    points += 10
                }
            }
            else if(parseInt(splitTime[0])  == 15){
                console.log("Purchase Time Within 2pm and 4pm: 10 points have been added.")
                points += 10
            }

        console.log(points)

        return points;

    }catch(e){
        console.log("Error fetching points: " + e);
    }

    
}



module.exports = {
    processReceipt,
    getPoints
}