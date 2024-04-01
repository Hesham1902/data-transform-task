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
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const brands_schema_1 = require("./brands-schema");
const fixFunctions_1 = require("./fixFunctions");
const validateErrors_1 = require("./validateErrors");
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb://localhost:27017/Task");
        }
        catch (err) {
            throw new Error(`Error connecting to database: ${err.message}`);
        }
    });
}
exports.connectToDatabase = connectToDatabase;
function transformData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectToDatabase();
        const brands = yield brands_schema_1.Brand.find();
        const validationErrors = [];
        yield Promise.all(brands.map((brand) => __awaiter(this, void 0, void 0, function* () {
            yield (0, validateErrors_1.validateAndLogErrors)(brand, validationErrors);
            yield (0, fixFunctions_1.fixYearFoundedErrors)(brand);
            yield (0, fixFunctions_1.fixnumberOfLocationsErrors)(brand);
            yield (0, fixFunctions_1.fixheadOfQuarter)(brand);
            yield (0, fixFunctions_1.fixBrandName)(brand);
            yield brand.save();
        })));
        if (validationErrors.length > 0) {
            console.error("Validation errors occurred:");
            validationErrors.forEach((error) => {
                console.error(`Brand ${error.brandId}: ${error.message}`);
            });
        }
        else {
            console.log("No validation errors.");
        }
        console.log("Data transformation completed.");
        process.exit(0);
    });
}
transformData().catch(console.error);
