import { IBrand } from "./brands-schema";

export async function validateAndLogErrors(brand: IBrand, errors: any[]) {
  const validationError = brand.validateSync();
  if (validationError) {
    const paths = Object.keys(brand.schema.paths);
    paths.forEach((path) => {
      if (validationError.errors[path]) {
        errors.push({
          brandId: brand._id,
          path,
          message: validationError.errors[path].message,
        });
      }
    });
  } else {
    console.log(`Validation for brand ${brand._id}: Valid`);
  }
}
