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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDummyData = void 0;
const faker_1 = require("@faker-js/faker");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
// Convert fs.writeFile into a promise-based function
const writeFile = util_1.default.promisify(fs_1.default.writeFile);
function generateDummyData() {
    return __awaiter(this, void 0, void 0, function* () {
        // Dummy data generation logic
        const brands = [];
        for (let i = 0; i < 10; i++) {
            const brandName = faker_1.faker.company.name();
            const yearFounded = faker_1.faker.number.int({ min: 1600, max: 2024 });
            const headquarters = faker_1.faker.location.city();
            const numberOfLocations = faker_1.faker.number.int({ min: 1, max: 10 });
            brands.push({ brandName, yearFounded, headquarters, numberOfLocations });
        }
        console.log("Dummy data generated successfully.");
        // Save the data to a file
        try {
            yield writeFile("brands.json", JSON.stringify(brands, null, 2));
            console.log("Data saved to brands.json successfully.");
        }
        catch (error) {
            console.error("Error saving data to brands.json:", error);
        }
    });
}
exports.generateDummyData = generateDummyData;
// Call the function to generate and save the data
generateDummyData();
