import CustError  from '../utils/CustomError.js';


const sendErrorForDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProduction = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};


const handleJWTError = () =>
  new CustError('Invalid Token. please login again', 401);

const handleExpiredJWT = () =>
  new CustError('Expired Token. please login again', 401);

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, req, res);
  } else {
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleExpiredJWT();
    sendErrorForProduction(err, req, res);
  }
};

export default globalError;
