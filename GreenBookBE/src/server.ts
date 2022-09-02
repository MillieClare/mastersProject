import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import companyRoutes from './routes/Company';
import graphDataRoutes from './routes/GraphData';

const router = express();

//** CONNECT TO MONGOOSE */

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('Connected to mongoDB');
    StartServer();
  })
  .catch((error) => {
    Logging.error('Unable to connect: ');
    Logging.error(error);
  });

//** Only start the express server if Mongo is connected */

const StartServer = () => {
  router.use((req, res, next) => {
    /** log the request - get the method, the url (where the request is going/API endpoint) then the IP of whoever is calling/passing the method */
    Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      /** Log response add status to see what happened to the request*/
      Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });

    next(); // allows us to pass through this middlewear instead of ending the request here
  });

  // housekeeping (I only wanna get JSON requests. It's cool if they're nested)
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

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
  router.use('/companies', companyRoutes);
  router.use('/graphData', graphDataRoutes);

  /** Healthcheck */
  router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

  /** Error handling */
  router.use((req, res, next) => {
    const error = new Error('not found');
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};
