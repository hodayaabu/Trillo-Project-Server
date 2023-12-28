import { logger } from "../services/logger.service.js";

export function log(req, res, next) {
  loggerService.debug("req", req);
  next();
}
