import { app } from './app.js';
import logger from "./infra/logger/logger.js";

const PORT_SERVER = 3000
app.listen(PORT_SERVER, () => {
    logger.info(`${new Date().toISOString()}: Server Running at http://localhost:${PORT_SERVER}`);
});