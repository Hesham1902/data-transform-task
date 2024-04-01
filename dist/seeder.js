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
const transform_1 = require("./transform");
const brands_schema_1 = require("./brands-schema");
const fs_1 = __importDefault(require("fs"));
// Read data from brands.json
const brandsData = JSON.parse(fs_1.default.readFileSync("./brands.json").toString());
(0, transform_1.connectToDatabase)();
// Insert data into DB
const insertData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield brands_schema_1.Brand.insertMany(brandsData);
        console.log("Data Inserted");
        process.exit();
    }
    catch (error) {
        console.log(error);
    }
});
// Delete data from DB
const destroyData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield brands_schema_1.Brand.deleteMany();
        console.log("Data Destroyed");
        process.exit();
    }
    catch (error) {
        console.log(error);
    }
});
// Check command-line arguments and execute accordingly
if (process.argv[2] === "-i") {
    insertData();
}
else if (process.argv[2] === "-d") {
    destroyData();
}
else {
    console.log("Please provide a valid argument: -i for insert or -d for delete.");
}
