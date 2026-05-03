const { AzureOpenAI } = require("openai");

const { MongoClient } = require("mongodb");

require('dotenv').config();


const aiClient = new AzureOpenAI({

  endpoint: process.env.AZURE_OPENAI_ENDPOINT,

  apiKey: process.env.AZURE_OPENAI_KEY,

  apiVersion: "2024-05-01-preview",

});


const mongoClient = new MongoClient(process.env.MONGODB_URI);


async function vectorizeData() {

  try {

    await mongoClient.connect();

    const db = mongoClient.db("ChatBotDB");

    const collection = db.collection("knowledge_base");


    // Fetch ALL documents to ensure we overwrite any broken ones

    const documents = await collection.find({}).toArray();

    console.log(`Found ${documents.length} documents to vectorize...`);


    for (const doc of documents) {

      console.log(`Processing document: ${doc.title || doc.name || doc.type}`);

      

      // 1. Strip out unnecessary metadata so the AI only reads the good stuff

      const { _id, embedding, lastUpdated, ...usefulData } = doc;


      // 2. Convert the complex JSON object into a plain string

      const textToVectorize = JSON.stringify(usefulData);

      

      // 3. Send the string to Azure to get the vector numbers

      const response = await aiClient.embeddings.create({

        model: "text-embedding-3-small", 

        input: textToVectorize 

      });

      

      const vector = response.data[0].embedding;


      // 4. Save the vector back to the database

      await collection.updateOne(

        { _id: doc._id },

        { $set: { embedding: vector } }

      );

    }


    console.log("✅ All 15 IMPETUS documents successfully vectorized!");

    process.exit(0);


  } catch (error) {

    console.error("❌ Error:", error);

    process.exit(1);

  }

}


vectorizeData();