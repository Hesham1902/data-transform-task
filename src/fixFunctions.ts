import { IBrand } from "./brands-schema";

// Fixing Functions

export async function fixYearFoundedErrors(brand: IBrand): Promise<void> {
  const yearCreated = brand.get("yearCreated");
  const yearsFounded = brand.get("yearsFounded");

  if (yearCreated) {
    brand.yearFounded = Number(yearCreated);
    brand.set("yearCreated", undefined, { strict: false });
  } else if (yearsFounded) {
    brand.yearFounded = Number(yearsFounded);
    brand.set("yearsFounded", undefined, { strict: false });
  } else if (!brand.yearFounded || isNaN(brand.yearFounded)) {
    brand.yearFounded = 1600;
  }
}

export async function fixnumberOfLocationsErrors(brand: IBrand): Promise<void> {
  if (
    typeof brand.numberOfLocations !== "number" ||
    isNaN(Number(brand.numberOfLocations))
  ) {
    brand.numberOfLocations = 1;
  }
}

export async function fixheadOfQuarter(brand: IBrand): Promise<void> {
  if (!brand.headquarters) {
    brand.headquarters = brand.get("hqAddress");
    brand.set("hqAddress", undefined, { strict: false });
  }
}

export async function fixBrandName(brand: IBrand): Promise<void> {
  if (brand.get("brand")) {
    if (brand.get("brand").name) {
      console.log(brand.get("brand").name);
      brand.brandName = brand.get("brand").name;
    }
  }
  brand.set("brand", undefined, { strict: false });
}
