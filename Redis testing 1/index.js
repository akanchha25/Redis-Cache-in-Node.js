import express, { json } from "express"
import { createClient } from "redis" // problem with this library is that this library inherently works with callbacks and it doesn't work with promises (here we can do trick in order to return a promise is to use the built in promisify function)
import { promisify } from "util"
//import { createClient } from "redis"
const redisUrl = "redis://127.0.0.1:6379"
const client = createClient(redisUrl) //client to interact with redis

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();
//client.set = promisify(client.set)
const app = express()
app.use(json())

client.set('framework', 'ReactJS', function(err, reply) {
    console.log(reply); // OK
  });

app.post("/", async (req, res) => {
    try{     
    const { key, value } = req.body
    const response = await client.set(key, value)
    const value1 = await client.get(key)
    res.json(response);
    
    } catch (error) {
        console.log(error.message)
        
    }

})





app.listen(8080, () =>{
    console.log("server starts on port 8080")
})