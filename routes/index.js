const express = require('express');
const router = express.Router();
const axios = require("axios")

const {createConsent, getConsent} = require("./consent");
const { createDataSession, getData, getFIU} = require('./data');

// check for the client ID and Secret. Necessary for Authorizing the APIs
const checkAuth = (req)=>{
    try{
        const headers = new Object(req.headers)
        console.log(headers)
        const check = headers.hasOwnProperty('clientid') && headers.hasOwnProperty('clientsecret')
        console.log(check)
        return check
    } catch(e){
        return false;
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
/*
    Checking the Health
*/
router.get('/', (req,res)=>{

    
    if(!checkAuth(req)){
        res.status(403).send({
            "message":"Unauthorized. Please pass proper auth keys"
        })
    }
    res.send("Home");
});

/*
    Consent APIs

        - consent POST
            - Creates a consent with the parameters passed in the body
            - Mandatory Body params -> Phone numeber (attr : mobileNumber)
            - Headers are Mandatory for Authorization

        - consent GET
            - Fetches the details of the consent from the consent ID
            - Mandatory path params -> consent ID (attr : id)
            - Headers are Mandatory for Authorization
*/

router.post("/consent", async(req, res)=>{
    try {

        if(!checkAuth(req)){
            res.status(403).send({
                "message":"Unauthorized. Please pass proper auth keys"
            })
        }

        const mobile = req.body.mobileNumber;
        const config = req.body;

        if(mobile){
            const response = await createConsent(mobile, config, req.headers);
            res.send( {
                "body":response
            });
        }
        else {
            return {
                "statusCode":"503",
                "status":"Error",
                "message":"Parameters not passed properly"
            }
        }
    } catch(e){
        console.log(e);
    }
})

//

router.get("/consent/:id", async(req, res)=>{
    try {

        if(!checkAuth(req)){
            res.status(403).send({
                "message":"Unauthorized. Please pass proper auth keys"
            })
        }

        const id = req.params.id //req.body.mobileNumber;

        if(id){
            const response = await getConsent(id, req.headers);
            res.send( {
                "body":response
            });
        }
        else {
            res.send({
                "statusCode":"503",
                "status":"Error",
                "body":{
                    "message":"Parameters not passed properly"
                }
            })
        }
    } catch(e){
        console.log(e);
    }
})

/*
    Data Fetch APIs

        - data GET
            - Creates Data session from the consent ID (only if the consent is ACTIVE)
            - Fetches the Data from the data directly from the data session ID
            - Mandatory path params -> consent ID (attr : id)
            - Headers are Mandatory for Authorization 
        
        - dataSession POST
            - Creates a Data Session from the consent ID (only if the consent is ACTIVE)
            - Mandatory path params -> consent ID (attr : id)
            - Headers are Mandatory for Authorization 

        - getData GET
            - Fetches the data from the created data session\
            - Mandatory path params -> Data session ID (attr : id)
            - Headers are Mandatory for Authorization

        - fiuList GET
            - Fetches the list of FIUs
            - Headers are Mandatory for Authorization 
*/
router.post("/dataSession/:id", async(req, res)=>{
    try {
        if(!checkAuth(req)){
            res.status(403).send({
                "message":"Unauthorized. Please pass proper auth keys"
            })
        }

        const id = req.params.id //req.body.mobileNumber;

        if(id){
            const body = {
                "id":id,
                "from":"2022-02-01T00:00:00Z",
                "to":"2022-07-01T00:00:00Z"
            }
            const response = await createDataSession(body, req.headers);
            
            res.send( {
                "body":response
            });
        }
        else {
            res.send({
                "statusCode":"503",
                "status":"Error",
                "body":{
                    "message":"Parameters not passed properly"
                }
            })
        }
    } catch(e){
        console.log(e);
    }
})

router.get("/data/:id", async(req, res)=>{
    try {

        if(!checkAuth(req)){
            res.status(403).send({
                "message":"Unauthorized. Please pass proper auth keys"
            })
        }
        const id = req.params.id //req.body.mobileNumber;

        if(id){
            const body = {
                "id":id,
                "from":"2022-02-01T00:00:00Z",
                "to":"2021-07-01T00:00:00Z"
            }
            const response = await createDataSession(body, req.headers);
            console.log(response)
            
            const dataSessionId = response["id"]
            await sleep(5000);
            const resp = await getData(dataSessionId, req.headers);
            
            res.send( {
                "body":resp
            });
        }
        else {
            res.send({
                "statusCode":"503",
                "status":"Error",
                "body":{
                    "message":"Parameters not passed properly"
                }
            })
        }
    } catch(e){
        console.log(e);
    }
})

router.get("/getData/:id", async(req, res)=>{
    try {

        if(!checkAuth(req)){
            res.status(403).send({
                "message":"Unauthorized. Please pass proper auth keys"
            })
        }
        const id = req.params.id;

        const response = await getData(id, req.headers);
        res.send({
                "body":response
            });
    } catch(e){
        console.log(e);
    }
})

//// FIUs

router.get("/fiuList", async(req, res)=>{
    try {

        if(!checkAuth(req)){
            res.status(403).send({
                "message":"Unauthorized. Please pass proper auth keys"
            })
        }
        const response = await getFIU(req.headers);
        res.send({
                "body":response
            });
    } catch(e){
        console.log(e);
    }
})

module.exports = {router} ;