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
exports.validateAndLogErrors = void 0;
function validateAndLogErrors(brand, errors) {
    return __awaiter(this, void 0, void 0, function* () {
        const validationError = brand.validateSync();
        console.log(validationError);
        if (validationError) {
            console.log(validationError);
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
        }
        else {
            console.log(`Validation for brand ${brand._id}: Valid`);
        }
    });
}
exports.validateAndLogErrors = validateAndLogErrors;
