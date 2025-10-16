/**
 * Notes:
 * Go to mongoDB website
 * create a free MO cluster
 * create a user
 * Get the connection string
 * Install mongoDB Compass
 * Connect it to mongodb website using connection string.
 */

const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
  "mongodb+srv://namaste-node:lQIccAHIbPZ1DrLU@namastenode.xclab9o.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = "HelloWorld";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  const data = {
    firstName: "Ankit",
    lastName: "Tiwari",
    city: "Ara",
    country: "India",
  };

  // insert a document
  //   const insertResult = await collection.insertOne(data);
  //   console.log("Inserted Document =>", insertResult);

  // find all documet with a filter of country: "India"

  const result = await collection.find({ city: "Kanpur" }).toArray();
  console.log("result => ", result);

  // find one and update
  //   const updated = await collection.findOneAndUpdate(
  //     { firstName: "Selfish" },
  //     {
  //       $set: { firstName: "Ankit" },
  //       $set: { skills: ["JavaScript", "NodeJs", "ReactJs", "SpringBoot"] },
  //     },
  //     { returnDocument: "after" } // optional: return updated document
  //   );

  // console.log("Updated One =>", updated);

  // adding age and correcting first name
  //   await collection.findOneAndUpdate(
  //     { firstName: "Ankit" },
  //     {
  //       $set: { firstName: "Ankit" },
  //       $inc: { age: 1 },
  //       $push: { skills: "Java" },
  //     }
  //   );

  const distinct = await collection.distinct("lastName");
  console.log("Distinct value of firstName =>", distinct);

  // let's rename collection
  collection.rename("MyFirstDb");

  // count document
  const count = await collection.countDocuments({});
  console.log("Total Document =>", count);

  // find all the documents
  const findResult = await collection.find({}).toArray();
  console.log("Found Document =>", findResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
