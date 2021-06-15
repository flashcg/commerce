require('dotenv').config()
import fetch from "node-fetch"
// const fs = require('fs')
// const fetch = require('node-fetch')

// const API_ENDPOINT = process.env.API_ENDPOINT+"products.json"
const URL = "https://cloneralliance.myshopify.com/admin/api/2020-10/";

const headers= { 
  "method": "GET",
}

exports.handler = async (event, context) => {
  let statusCode
  const path=event.queryStringParameters.path
  if (path===null || path===undefined){
    console.log("ERROR: api path 未定义或者为null")
    return{
      statusCode: 422, 
      body: "api?path= is undefined or null" 
    }
  }
  const API_ENDPOINT=URL+path+".json"

  if (event.httpMethod === "GET"){
    console.log(API_ENDPOINT)
    return fetch(API_ENDPOINT, { 
      "method": "GET",
      headers: headers
    }).then(response => {
      statusCode = response.status;
      return response.json()
    }).then(data => ({
      statusCode: statusCode,
      body: JSON.stringify(data)
    })).catch(error => ({
      statusCode: 422, 
      body: String(error) 
    }));
  }
};