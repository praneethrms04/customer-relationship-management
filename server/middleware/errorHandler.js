const { errorCodes } = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case errorCodes.UNAUTHORIZED:
      res.json({
        title: "UnAuthorized",
        message: err.message,
        stackTrace: err.stack,
      });
    case errorCodes.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
    case errorCodes.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
    case errorCodes.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
    case errorCodes.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
      });

    default:
      console.log("No..Error  All are Good");
      break;
  }
};
module.exports = { errorHandler };
