import { faker } from "@faker-js/faker";
import fs from "fs";
import util from "util";

// Convert fs.writeFile into a promise-based function
const writeFile = util.promisify(fs.writeFile);

export async function generateDummyData() {
  // Dummy data generation logic
  const brands = [];
  for (let i = 0; i < 10; i++) {
    const brandName = faker.company.name();
    const yearFounded = faker.number.int({ min: 1600, max: 2024 });
    const headquarters = faker.location.city();
    const numberOfLocations = faker.number.int({ min: 1, max: 10 });
    brands.push({ brandName, yearFounded, headquarters, numberOfLocations });
  }

  console.log("Dummy data generated successfully.");

  // Save the data to a file
  try {
    await writeFile("brands.json", JSON.stringify(brands, null, 2));
    console.log("Data saved to brands.json successfully.");
  } catch (error) {
    console.error("Error saving data to brands.json:", error);
  }
}

// Call the function to generate and save the data
generateDummyData();
