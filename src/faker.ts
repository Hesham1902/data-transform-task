import { faker } from "@faker-js/faker";
import fs from "fs";
import util from "util";
import ExcelJS from "exceljs";

// Convert fs.writeFile into a promise-based function
const writeFile = util.promisify(fs.writeFile);

export async function generateDummyData() {
  // Dummy data generation logic
  const brands = [];
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Brands");

  worksheet.columns = [
    { header: "Brand Name", key: "brandName" },
    { header: "Year Founded", key: "yearFounded" },
    { header: "Headquarters", key: "headquarters" },
    { header: "Number of Locations", key: "numberOfLocations" },
  ];

  for (let i = 0; i < 10; i++) {
    const brandName = faker.company.name();
    const yearFounded = faker.number.int({ min: 1600, max: 2024 });
    const headquarters = faker.location.city();
    const numberOfLocations = faker.number.int({ min: 1, max: 10 });

    brands.push({ brandName, yearFounded, headquarters, numberOfLocations });

    worksheet.addRow({
      brandName,
      yearFounded,
      headquarters,
      numberOfLocations,
    });
  }

  console.log("Dummy data generated successfully.");

  // Save the data to a JSON file
  try {
    await writeFile("brands.json", JSON.stringify(brands, null, 2));
    console.log("Data saved to brands.json successfully.");

    // Save the data to an Excel file
    await workbook.xlsx.writeFile("brands.xlsx");
    console.log("Data saved to brands.xlsx successfully.");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

// Call the function to generate and save the data
generateDummyData();
