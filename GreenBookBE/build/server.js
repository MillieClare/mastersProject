"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Company_1 = __importDefault(require("./routes/Company"));
const GraphData_1 = __importDefault(require("./routes/GraphData"));
const router = (0, express_1.default)();
//** CONNECT TO MONGOOSE */
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('Connected to mongoDB');
    StartServer();
})
    .catch((error) => {
    Logging_1.default.error('Unable to connect: ');
    Logging_1.default.error(error);
});
//** Only start the express server if Mongo is connected */
const StartServer = () => {
    router.use((req, res, next) => {
        /** log the request - get the method, the url (where the request is going/API endpoint) then the IP of whoever is calling/passing the method */
        Logging_1.default.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /** Log response add status to see what happened to the request*/
            Logging_1.default.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next(); // allows us to pass through this middlewear instead of ending the request here
    });
    // housekeeping (I only wanna get JSON requests. It's cool if they're nested)
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of the API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); // * means requests can come from anywhere
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // what headers allowed to use
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    router.use('/companies', Company_1.default);
    router.use('/graphData', GraphData_1.default);
    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on port ${config_1.config.server.port}.`));
};
