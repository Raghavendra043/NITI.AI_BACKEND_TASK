const axios = require("axios")

const dotenv = require('dotenv');
dotenv.config();

const BASE_URL = process.env.BASE_URL

const createDataSession = async(config, auth)=>{
    try{

        const url = `${BASE_URL}/sessions`

        const body = {
            "consentId": config["id"],
            "DataRange": {
              "from": config["from"],
              "to": config["to"]
            },
            "format": "json"
        }
        
        const {data} = await axios.post(url, body, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "x-client-id": auth["clientid"],
                                    "x-client-secret": auth["clientsecret"]
                                  }
                            })

        return data;

    }catch(e){
        console.log(e);
        return {
            "statusCode":"503",
            "status":"error",
            "body":{
                "message":"Error creating a data session"
            }
        }
    }
}

const getData = async(id, auth)=>{

    try{

        const url = `${BASE_URL}/sessions/${id}`

        const {data} = await axios.get(url,{
                        headers: {
                            "Content-Type": "application/json",
                            "x-client-id": auth["clientid"],
                            "x-client-secret": auth["clientsecret"]
                        }
                    })

        return data;
    }catch(e){
        console.log(e);
        return {
            "statusCode":"503",
            "status":"error",
            "body":{
                "message":"Error fetching data from ID",
                "dataSessionId":id
            }
        }
    }
}

const getFIU = async(auth)=>{
    try{
        const {data} = await axios.get(`${BASE_URL}/fips`,{
            headers: {
                "Content-Type": "application/json",
                "x-client-id": auth["clientid"],
                "x-client-secret": auth["clientsecret"]
            }
        })

        return data;
    } catch(e){
        console.log(e);
        return {
            "statusCode":"503",
            "status":"error",
            "body":{
                "message":"Error fetching FIU List"
            }
        }
    }
}


module.exports = {
    createDataSession,
    getData,
    getFIU
}