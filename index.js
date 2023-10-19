const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()



const cors = require('cors')
const app =express()
const port = process.env.PORT|| 5000;

// middlewares
app.use(cors());
app.use(express.json());

// creating mongodb


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kit4epp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    app.get('/brand',async(req,res)=>{
        const cursor =brandcollection.find()
        const result= await cursor.toArray()
        res.send(result)
    })

    app.post('/brand',async(req,res)=>{
        const brand=req.body
        console.log(brand);
        const result=await brandcollection.insertOne(brand)
        res.send(result)
    })

    app.get('/carts',async(req,res)=>{

      const cursor =addedcartcollection.find()
      const result =await cursor.toArray();
      res.send(result) 


    })

    app.get('/carts/:id',async(req,res)=>{
        const id =req.params.id
    })

    app.post('/carts',async(req,res)=>{
      const carts= req.body
      console.log(carts);
      const result=await addedcartcollection.insertOne(carts)
      res.send(result)

    })

    app.delete('/carts/:id', async(req,res)=>{
      const id =req.params.id
      const query ={_id: new ObjectId(id)}
      const result= await addedcartcollection.deleteOne(query)
      res.send(result)
    })

   

   
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const addedcartcollection =client.db('addedcart').collection('carts')


    const brandcollection = client.db('brands').collection('brand')

   

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/',(req,res)=>{
    res.send("car server is runningggg ")
})

app.listen(port,()=>{
    console.log(`app is running on port${port}`);
})

