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
const brands_schema_1 = require("./brands-schema");
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const database_1 = __importDefault(require("./database"));
// Read data from brands.json
// const brandsData = JSON.parse(fs.readFileSync("./brands.json").toString());
const readJsonFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data.toString()));
        });
    });
};
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    const command = `mongoimport --db Task --collection brands --drop --jsonArray --file Task.brands.json`;
    (0, child_process_1.exec)(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing mongoimport: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        process.exit();
    });
});
// Insert data into DB
const insertData = (brandsData) => __awaiter(void 0, void 0, void 0, function* () {
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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.default)();
    // Check command-line arguments and execute accordingly
    if (process.argv[2] === "-i") {
        const brandsData = yield readJsonFile("./brands.json");
        insertData(brandsData);
    }
    else if (process.argv[2] === "-d") {
        destroyData();
    }
    else if (process.argv[2] === "-import") {
        importData().catch(console.error);
    }
    else {
        console.log("Please provide a valid argument: -i for insert or -d for delete -import for importing json file.");
    }
});
main().catch(console.error);
