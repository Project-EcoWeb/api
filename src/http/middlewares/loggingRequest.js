import logger from "../../infra/logger/logger.js";

export default async (req, res, next) =>{
    const { method, url } = req;
    const startTime = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - startTime;
        logger.info(`${method} ${url} - ${res.statusCode} - ${duration}ms`);
    });

    next();
}