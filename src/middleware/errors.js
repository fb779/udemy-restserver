const errorHanddler = (err, req, res, next) => {
  console.log('error generalizado', err);
  if (err.hasOwnProperty('status')) {
    return res.status(err.status).json({
      ok: false,
      message: err.message,
      errors: err.errors,
    });
  }

  if (!err.hasOwnProperty('status') && err.hasOwnProperty('errors')) {
    return res.status(400).json({
      ok: false,
      message: err.message,
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
