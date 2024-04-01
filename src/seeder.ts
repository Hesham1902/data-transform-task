import { connectToDatabase } from "./transform";
import { Brand } from "./brands-schema";
import fs from "fs";

// Read data from brands.json
const brandsData = JSON.parse(fs.readFileSync("./brands.json").toString());
connectToDatabase();

// Insert data into DB
const insertData = async () => {
  try {
    await Brand.insertMany(brandsData);

    console.log("Data Inserted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Brand.deleteMany();
    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Check command-line arguments and execute accordingly
if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  destroyData();
} else {
  console.log(
    "Please provide a valid argument: -i for insert or -d for delete."
  );
}
