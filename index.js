const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://dream-shop-dinajpur:dream-shop-dinajpur@cluster0.iszro.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  await client.connect()
  const Productcollection = client.db("test").collection("product");
  const DiscountCollection = client.db("test").collection("discount");
  const phoneCollection = client.db("test").collection("phones");
  const reviueCollection = client.db("test").collection("reviue");
  const orderCollection = client.db("test").collection("order");
  try {
    app.post('/product', async (req, res) => {
      const product = req.body;
      const result = await Productcollection.insertOne(product)
      res.send(result);
    });

    // post phone
    app.post('/phones', async (req, res) => {
      const phone = req.body;
      const result = await phoneCollection.insertOne(phone)
      res.send(result);
    });


    // post discount
    app.post('/discount', async (req, res) => {
      const discount = req.body;
      const result = await DiscountCollection.insertOne(discount)
      res.send(result);
      console.log('added')
    });
    // post reviue
    app.post('/reviue', async (req, res) => {
      const reviue = req.body;
      const result = await reviueCollection.insertOne(reviue)
      res.send(result);
      console.log('added')
    });

    // post order
    app.post('/order', async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order)
      res.send(result);
      console.log('added')
    });

    // get discount product 
    app.get('/allorder', async (req, res) => {
      const quary = {}
      const cursor = orderCollection.find(quary);
      const result = await cursor.toArray();
      res.send(result)
    })
    // get discount product 
    app.get('/discount', async (req, res) => {
      const quary = {}
      const cursor = DiscountCollection.find(quary);
      const result = await cursor.toArray();
      res.send(result)
    })

    // get fashion single product 
    app.get('/manageorder/:_id', async (req, res) => {
      const _id = req.params._id;
      const query = { _id: ObjectId(_id) };
      const product = await Productcollection.findOne(query);
      res.send(product)
    })

    // get order by email 
    app.get('/myorder', async (req, res) => {
      const email = req.query.email;
      const quary = { email: email }
      const cursor = orderCollection.find(quary)
      const product = await cursor.toArray()
      res.send(product)
    })
    // get discount reviue
    app.get('/reviue', async (req, res) => {
      const quary = {}
      const cursor = reviueCollection.find(quary);
      const result = await cursor.toArray();
      res.send(result)
    })



    // get product

    app.get('/product', async (req, res) => {
      const quary = {}
      const cursor = Productcollection.find(quary);
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/electronics', async (req, res) => {
      const quary = { type: 'electronics' }
      const cursor = Productcollection.find(quary)
      const product = await cursor.toArray()
      res.send(product)
    })
    app.get('/fashion', async (req, res) => {
      const quary = { type: 'fashion' }
      const cursor = Productcollection.find(quary)
      const product = await cursor.toArray()
      res.send(product)
    });

    app.get('/decoration', async (req, res) => {
      const quary = { type: 'decoration' }
      const cursor = Productcollection.find(quary)
      const product = await cursor.toArray()
      res.send(product)
    })

    // find phone  symphony
    app.get('/symphony', async (req, res) => {
      const quary = { brand: 'Symphony' }
      const cursor = phoneCollection.find(quary)
      const phone = await cursor.toArray()
      res.send(phone)
    })
    // find phone  samsung
    app.get('/samgsung', async (req, res) => {
      const quary = { brand: 'Samgsung' }
      const cursor = phoneCollection.find(quary)
      const phone = await cursor.toArray()
      res.send(phone)
    })
    // find phone  xiaomi
    app.get('/xiaomi', async (req, res) => {
      const quary = { brand: 'Xiaomi' }
      const cursor = phoneCollection.find(quary)
      const phone = await cursor.toArray()
      res.send(phone)
    })

  }
  finally {

  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('connected with database')
})


app.listen(port, () => {
  console.log("server open");
});