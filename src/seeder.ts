import { Brand, IBrand } from "./brands-schema";
import fs from "fs";
import { exec } from "child_process";
import connectToDatabase from "./database";

// Read data from brands.json
// const brandsData = JSON.parse(fs.readFileSync("./brands.json").toString());

const readJsonFile = (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data.toString()));
    });
  });
};

const importData = async () => {
  const command = `mongoimport --db Task --collection brands --drop --jsonArray --file Task.brands.json`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing mongoimport: ${error}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    process.exit();
  });
};

// Insert data into DB
const insertData = async (brandsData: any[]) => {
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

const main = async () => {
  await connectToDatabase();
  // Check command-line arguments and execute accordingly
  if (process.argv[2] === "-i") {
    const brandsData = await readJsonFile("./brands.json");
    insertData(brandsData);
  } else if (process.argv[2] === "-d") {
    destroyData();
  } else if (process.argv[2] === "-import") {
    importData().catch(console.error);
  } else {
    console.log(
      "Please provide a valid argument: -i for insert or -d for delete -import for importing json file."
    );
  }
};

main().catch(console.error);
