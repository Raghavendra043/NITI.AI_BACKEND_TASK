const axios = require("axios")

const dotenv = require('dotenv');
dotenv.config();

const BASE_URL = process.env.BASE_URL

const createConsent = async(mobileNumber,config, auth)=>{
    try{
        const start = new Date();
        const end = new Date(start.getTime() + 600000);

        const from = "2022-02-01T00:00:00Z";
        const to = "2022-07-01T00:00:00Z";

        var body = {
            Detail: {
              consentStart: (config["consentStart"]) ? config["consentStart"] : start.toISOString(),
              consentExpiry: (config["consentExpiry"]) ? config["consentExpiry"] : end.toISOString(),
              Customer: {
                id:  `${mobileNumber}@onemoney`,
              },
              FIDataRange: (config["FIDataRange"]) ? config["FIDataRange"] : {
                from: from,
                to: to,
              },
              consentMode: (config["consentMode"]) ? config["consentMode"] : "STORE",
              consentTypes: (config["consentTypes"]) ? config["consentTypes"] : ["TRANSACTIONS", "PROFILE", "SUMMARY"],
              fetchType: (config["fetchType"]) ? config["fetchType"] : "PERIODIC",
              Frequency: (config["Frequency"]) ? config["Frequency"] : {
                value: 30,
                unit: "MONTH",
              },
              DataFilter: (config["DataFilter"]) ? config["DataFilter"] : [
                {
                  type: "TRANSACTIONAMOUNT",
                  value: "5000",
                  operator: ">=",
                },
              ],
              DataLife: (config["DataLife"]) ? config["DataLife"] : {
                value: 1,
                unit: "MONTH",
              },
              DataConsumer: (config["DataConsumer"]) ? config["DataConsumer"] : {
                id: "setu-fiu-id",
              },
              Purpose: (config["Purpose"]) ? config["Purpose"] : {
                Category: {
                  type: "string",
                },
                code: "101",
                text: "Loan underwriting",
                refUri: "https://api.rebit.org.in/aa/purpose/101.xml",
              },
              fiTypes: (config["fiTypes"]) ? config["fiTypes"] : ["DEPOSIT"],
            },
            redirectUrl: (config["redirectUrl"]) ? config["redirectUrl"] : "https://setu.co",
          };

        const {data} = await axios.post('https://fiu-uat.setu.co/consents', body, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "x-client-id": auth["clientid"],
                                    "x-client-secret": auth["clientsecret"]
                                  }
                            })
        
        return {
            "id":data["id"],
            "url":data["url"],
            "status":data["status"],
            "Detail":data["Detail"]
        }
    }catch(e){
        console.log(e)
        return {
            "statusCode":"503",
            "status":"error",
            "body":{
                "message":"Error creating a new consent"
            }
        }
    }
}

const getConsent = async(id, auth)=>{
    try{

        const url = `${BASE_URL}/consents/${id}`
        const {data} = await axios.get(url,{
            headers: {
                "Content-Type": "application/json",
                "x-client-id": auth["clientid"],
                "x-client-secret": auth["clientsecret"]
              }
        } );
    
        return {
            "id":data["id"],
            "url":data["url"],
            "status":data["status"],
            "Detail":data["Detail"]
        };

    }catch(e){
        console.log(e);
        return {
            "statusCode":"503",
            "status":"error",
            "body":{
                "message":"Error fetching the consent"
            }
        }
    }
}

module.exports = {
    createConsent,
    getConsent
}