"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixBrandName = exports.fixheadOfQuarter = exports.fixnumberOfLocationsErrors = exports.fixYearFoundedErrors = void 0;
// Fixing Functions
function fixYearFoundedErrors(brand) {
    return __awaiter(this, void 0, void 0, function* () {
        const yearCreated = brand.get("yearCreated");
        const yearsFounded = brand.get("yearsFounded");
        if (yearCreated) {
            brand.yearFounded = Number(yearCreated);
            brand.set("yearCreated", undefined, { strict: false });
        }
        else if (yearsFounded) {
            brand.yearFounded = Number(yearsFounded);
            brand.set("yearsFounded", undefined, { strict: false });
        }
        else if (!brand.yearFounded || isNaN(brand.yearFounded)) {
            brand.yearFounded = 1600;
        }
    });
}
exports.fixYearFoundedErrors = fixYearFoundedErrors;
function fixnumberOfLocationsErrors(brand) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof brand.numberOfLocations !== "number" ||
            isNaN(Number(brand.numberOfLocations))) {
            brand.numberOfLocations = 1;
        }
    });
}
exports.fixnumberOfLocationsErrors = fixnumberOfLocationsErrors;
function fixheadOfQuarter(brand) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!brand.headquarters) {
            brand.headquarters = brand.get("hqAddress");
            brand.set("hqAddress", undefined, { strict: false });
        }
    });
}
exports.fixheadOfQuarter = fixheadOfQuarter;
function fixBrandName(brand) {
    return __awaiter(this, void 0, void 0, function* () {
        if (brand.get("brand")) {
            if (brand.get("brand").name) {
                console.log(brand.get("brand").name);
                brand.brandName = brand.get("brand").name;
                // brand.brandName = brand.get("brand").name ??
            }
        }
        brand.set("brand", undefined, { strict: false });
    });
}
exports.fixBrandName = fixBrandName;
