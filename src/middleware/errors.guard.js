const errorHanddler = (err, req, res, next) => {
  // console.log('error generalizado', err);
  const errorStatus = err.status || 500;
  let errorObject;

  if (typeof err.toJson === 'function') {
    errorObject = err.toJson();
  } else {
    errorObject = {
      ok: false,
      message: 'UnkwnowError',
      errors: 'Unkwnow Error',
      errors: err,
    };
  }

  return res.status(errorStatus).json(errorObject);

  // if (!err.hasOwnProperty('status') && err.hasOwnProperty('errors')) {
  //   return res.status(400).json({
  //     ok: false,
  //     message: err.message,
  //     errors: err.errors,
  //   });
  // }

  // if (typeof err.toJson === 'function') {
  //   return res.status(err.status).json({
  //     ok: false,
  //     message: err.message,
  //     name: err.name,
  //   });
  // }

  // if (err.hasOwnProperty('status')) {
  //   return res.status(err.status).json({
  //     ok: false,
  //     message: err.message,
  //     name: err.name,
  //   });
  // }

  // return res.status(500).json({
  //   ok: false,
  //   message: 'UnkwnowError',
  //   errors: 'Unkwnow Error',
  //   errors: err,
  // });
};

module.exports = {
  errorHanddler,
};
