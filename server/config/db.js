const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();

exports.connectDB = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGODB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // serverSelectionTimeoutMS: 5000,
    });

    console.log(chalk.bgGreen.black.bold("✔️  DB connected successfully!"));

    // Get database size information
    // const db = mongoose.connection.db;
    // const stats = await db.stats(); 

    // // Log the size information in MB
    // console.log(chalk.blue(`Data Size: ${(stats.dataSize / (1024 * 1024)).toFixed(2)} MB`));
    // console.log(chalk.blue(`Storage Size: ${(stats.storageSize / (1024 * 1024)).toFixed(2)} MB`));
    // console.log(chalk.blue(`Index Size: ${(stats.indexSize / (1024 * 1024)).toFixed(2)} MB`));

  } catch (error) {
    console.log(chalk.bgRed.white.bold("❌ DB connection failed"));
    console.error(chalk.redBright(error));
    process.exit(1);
  }
};
