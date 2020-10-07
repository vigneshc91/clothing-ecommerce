import { extname } from 'path';
import { AppConstants } from './app_constants';
import multer from 'multer';
import { ErrorConstants } from './error_constants';
import { getUniqueNumber } from '../util/helper';

const multerOptions = {
    fileFilter: (req: any, file: any, callback: any) => {
        const extension = extname(file.originalname).toLowerCase();
        if (AppConstants.IMAGE_ALLOWED_EXTENSION.indexOf(extension) === -1) {
            let error = new Error(ErrorConstants.ONLY_IMAGES_ALLOWED);
            return callback(error);
        }
        callback(null, true);
    },
    limits: {
        fileSize: AppConstants.FILE_MAX_SIZE,
    },
    storage: multer.diskStorage({
        destination: './storage/uploads',
        filename: function (req, file, cb) {
            cb(null, `${file.fieldname}-${getUniqueNumber()}${extname(file.originalname)}`);
        }
    })
};

export const storage = multer(multerOptions);
