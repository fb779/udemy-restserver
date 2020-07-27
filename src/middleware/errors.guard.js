const errorHanddler = (err, req, res, next) => {
  // console.log('error generalizado', err);

  // if (err.hasOwnProperty('name') && err.name === 'JsonWebTokenError') {
  //   return res.status(err.status).json({
  //     ok: false,
  //     message: err.message,
  //     errors: err.name,
  //   });
  // }

  if (err.hasOwnProperty('name') && err.name === 'GoogleError') {
    return res.status(err.status).json({
      ok: false,
      message: err.message,
      errors: err.name,
    });
  }

  if (!err.hasOwnProperty('status') && err.hasOwnProperty('errors')) {
    return res.status(400).json({
      ok: false,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err.hasOwnProperty('status')) {
    return res.status(err.status).json({
      ok: false,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err.hasOwnProperty('kind') && err.kind === 'ObjectId') {
    return res.status(403).json({
      ok: false,
      message: `It is not valid Id`,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    ok: false,
    message: 'UnkwnowError',
    errors: 'Unkwnow Error',
    // message: err.message,
    // errors: err,
  });
};

module.exports = {
  errorHanddler,
};
