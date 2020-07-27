function ValidExistFiles(req, res, next) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw { ok: false, status: 400, message: 'No files were uploaded.' };
    }

    next();
  } catch (error) {
    next(error);
  }
}

function UploadSingleFile(req, res, next) {
  try {
    const fileNames = Object.keys(req.files);
    if (!req.files || fileNames.length === 0) {
      throw { ok: false, status: 400, message: 'No files were uploaded.' };
    }

    req.file = req.files[fileNames[0]];

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  ValidExistFiles,
  UploadSingleFile,
};
