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
exports.Schemas = exports.ValidateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const Logging_1 = __importDefault(require("../library/Logging"));
const ValidateSchema = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.body);
            next();
        }
        catch (error) {
            Logging_1.default.error(error);
            return res.status(422).json({ error });
        }
    });
};
exports.ValidateSchema = ValidateSchema;
exports.Schemas = {
    company: {
        create: joi_1.default.object({
            companyName: joi_1.default.string().required(),
            country: joi_1.default.string().required(),
            sector: joi_1.default.string().required(),
            sentimentScore: joi_1.default.number().required(),
            reviewer: joi_1.default.string().required(),
            reviewLink: joi_1.default.string(),
            marketInformationDate: joi_1.default.string(),
            marketInformationLink: joi_1.default.string()
        }),
        update: joi_1.default.object({
            companyName: joi_1.default.string().required(),
            country: joi_1.default.string().required(),
            sector: joi_1.default.string().required(),
            sentimentScore: joi_1.default.number().required(),
            reviewer: joi_1.default.string().required(),
            reviewLink: joi_1.default.string(),
            marketInformationDate: joi_1.default.string(),
            marketInformationLink: joi_1.default.string()
        })
    }
};
