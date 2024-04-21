import mongoose, { Error, MongooseError } from "mongoose";
import { Brand, IBrand } from "./brands-schema";
import {
  fixBrandName,
  fixheadOfQuarter,
  fixnumberOfLocationsErrors,
  fixYearFoundedErrors,
} from "./fixFunctions";
import { validateAndLogErrors } from "./validateErrors";
import connectToDatabase from "./database";

// export async function connectToDatabase() {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/Task");
//   } catch (err: any) {
//     throw new Error(`Error connecting to database: ${err.message}`);
//   }
// }

async function transformData() {
  await connectToDatabase();

  const brands: IBrand[] = await Brand.find();
  const validationErrors: any[] = [];

  await Promise.all(
    brands.map(async (brand) => {
      await validateAndLogErrors(brand, validationErrors);
      await fixYearFoundedErrors(brand);
      await fixnumberOfLocationsErrors(brand);
      await fixheadOfQuarter(brand);
      await fixBrandName(brand);
      await brand.save();
    })
  );

  if (validationErrors.length > 0) {
    console.error("Validation errors occurred:");
    validationErrors.forEach((error) => {
      console.error(`Brand ${error.brandId}: ${error.message}`);
    });
  } else {
    console.log("No validation errors.");
  }
  console.log("Data transformation completed.");
  process.exit(0);
}

transformData().catch(console.error);
