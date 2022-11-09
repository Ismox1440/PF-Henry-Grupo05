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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const shelters = yield prisma.shelter.findMany({
            where: { name: { contains: name } },
            include: { followers: true }
        });
        if (shelters.length)
            return res.status(200).send(shelters);
        else
            res.status(404).send('ERROR: Could not find any shelters');
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
router.get('/topFive', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shelters = yield prisma.shelter.findMany({
            take: 5,
            include: { followers: true },
            orderBy: { budget: 'desc' }
        });
        if (shelters)
            res.status(200).send(shelters);
        else
            res.status(404).send(shelters);
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
router.get('/sample', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // here we are able to expand this further, adding
    // more ordering criteria and even filters.
    const { order, type } = req.query;
    try {
        if (order && type) {
            const shelters = yield prisma.shelter.findMany({
                include: { followers: true },
                orderBy: { [order]: type }
            });
            res.status(200).send(shelters);
        }
        else
            res.status(404).send('ERROR: Missing parameters.');
    }
    catch (error) {
        res.status(400).send('ERROR: Invalid parameter.');
        console.log(error);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const shelter = yield prisma.shelter.findUnique({
            where: { id },
            include: { followers: true, author: true }
        });
        shelter ? res.status(200).send(shelter) : res.status(404).send("ERROR: Could not find shelter.");
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyShelter = req.body;
        yield prisma.shelter.create({
            data: {
                name: bodyShelter.name,
                authorId: bodyShelter.authorId,
                description: bodyShelter.description,
                profilePic: bodyShelter.profilePic,
                address: bodyShelter.address,
                website: bodyShelter.website,
                budget: bodyShelter.budget,
                goal: bodyShelter.goal
            }
        });
        res.status(200).json('Shelter created successfully.');
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bodyShelter = req.body;
        yield prisma.shelter.update({
            where: { id },
            data: {
                name: bodyShelter.name,
                description: bodyShelter.description,
                profilePic: bodyShelter.profilePic,
                address: bodyShelter.address,
                website: bodyShelter.website,
                budget: bodyShelter.budget,
                goal: bodyShelter.goal
            },
        });
        res.status(200).json('Shelter updated successfully.');
    }
    catch (error) {
        res.status(400).send('ERROR: There was an unexpected error.');
        console.log(error);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.shelter.delete({
            where: { id },
        });
        res.status(200).send("Shelter deleted successfully");
    }
    catch (error) {
        res.status(400).send("ERROR: There was an unexpected error.");
        console.log(error);
    }
}));
exports.default = router;
//# sourceMappingURL=shelters.js.map