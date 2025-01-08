"use server";

import mongoose from "mongoose";

async function dbConnector() {
  mongoose.set("strictQuery", true);

  return await mongoose.connect(process.env.MONGODB_URI!, {
    appName: "E-commerce Store",
    dbName: "ecommerce_store",
    // heartbeatFrequencyMS: 5000,
    // connectTimeoutMS: 20000,
    // retryReads: true
  })
  // .then(() => console.log("Connection Successful"))
  // .catch((error) => handleError(error));
}

// if (mongoose.connection)
  mongoose.connection.on("error", (err) => handleError(err));

const handleError = (error: Error) => {
  throw new Error("Connection failed!" + error.message);
};

export default dbConnector;
