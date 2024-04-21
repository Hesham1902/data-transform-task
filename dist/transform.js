"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.connectToDatabase = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const brands_schema_1 = require("./brands-schema");
const validateErrors_1 = require("./validateErrors");
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb://localhost:27017/Task");
        }
        catch (err) {
            throw new mongoose_1.Error(`Error connecting to database: ${err.message}`);
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
            console.log(brand);
            yield (0, validateErrors_1.validateAndLogErrors)(brand, validationErrors);
            // await fixYearFoundedErrors(brand);
            // await fixnumberOfLocationsErrors(brand);
            // await fixheadOfQuarter(brand);
            // await fixBrandName(brand);
            // await brand.save();
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
