import { Request } from "backend/types";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    const uploadPath = "uploads/";
    !fs.existsSync(uploadPath) && fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename(_req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

/**
 * Check if a file type matches one of the expected extensions (images only)
 * @param file
 * @param cb
 */
function checkFileType(
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(Error("Images only!"));
  }
}

const upload = multer({
  storage,
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req: Request | any, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
