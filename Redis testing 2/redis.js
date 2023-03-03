const express = require("express");
const redis = require("redis");
const redisUrl = "redis://127.0.0.1:6379";

const redisClient = redis.createClient(redisUrl);

redisClient.on("error", (err) => console.log("Redis Client Error", err));

const connectRedisClient = async () => {
  await redisClient.connect();
  console.log("Connected to Redis");
};

connectRedisClient();


const setKey = async (req, res) => {
  try {
    const { key, value } = req.body;
    const response = await redisClient.set(key, value);
    const value1 = await redisClient.get(key);
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};


const getKey = async (req, res, key) => {
    try {
      console.log("Getting key from Redis...");
      const response = await redisClient.get(key);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };


function getValue(redisKey) {
  return new Promise((resolve) => {
    redisClient.get(redisKey, (err, reply) => {
      if (err) console.err(err);
      else {
        console.log("success", redisKey);
      }
      resolve({ reply });
    });
  });
}

module.exports = { redisClient, getValue, getKey, setKey };


























// const express = require("express");
// const redis = require("ioredis");
// const redisUrl = "redis://127.0.0.1:6379";


// const redisClient = redis.createClient(redisUrl);

// redisClient.on("error", (err) => console.log("Redis Client Error", err));

// async () => {
//   await redisClient.connect();
// };

// // let redisClient;

// // (async () => {
// //     redisClient = redis.createClient(redisUrl)
// //     redisClient.on('error', (err) => console.log('Redis Client Error', err))
// //     await redisClient.connect()

// // })

// const setKey = async (req, res) => {
//   try {
//     const { key, value } = req.body;
//     const response = await redisClient.set(key, value);
//     const value1 = await redisClient.get(key);
//     res.json(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const getKey = async (req, res, key) => {
//   try {
    
//     console.log("error");
//     const response = await redisClient.get(key);
//     const data = JSON.parse(response)
//     res.json(data);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// function getValue(redisKey) {
//   return new Promise((resolve) => {
//     redisClient.get(redisKey, (err, reply) => {
//       if (err) console.err(err);
//       else {
//         console.log("success", redisKey);
//       }
//       resolve({ reply });
//     });
//   });
// }

// module.exports = { redisClient, getValue, getKey, setKey };

// // const express = require("express")
// // const app1 = express();

// // const redis = require('redis');

// //  const redisUrl = "redis://127.0.0.1:6379"

// // let redisClient;

// // (async () => {
// //     redisClient = redis.createClient(redisUrl)
// //     redisClient.on('error', (err) => console.log('Redis Client Error', err))
// //     await redisClient.connect()

// // })
// // //const app1 = express()
// // //app1.use(json())

// // app1.post("/", async (req, res) => {
// //     try{
// //     const { key, value } = req.body
// //     const response = await client.set(key, value)
// //     const value1 = await client.get(key)
// //     res.json(response);

// //     } catch (error) {
// //         console.log(error.message)

// //     }

// // })