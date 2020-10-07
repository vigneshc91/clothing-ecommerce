import { app } from '../server';
import { userRouter } from './user/routes/user.route';
import { categoryRouter } from './product/routes/category.route';
import { productRouter } from './product/routes/product.route';
import { urlencoded, json } from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors';
import { Logger } from '../util/logger';
import passport from 'passport';
import '../config/jwt';
import '../config/database';
import { corsOptions } from '../config/cors';
import swagger from '../config/swagger';
import swaggerUi from 'swagger-ui-express';
import { throttle } from '../config/throttle';
import { APP_NAME, BASE_URL } from '../config';
import { ErrorConstants } from '../config/error_constants';
import { SuccessConstants } from '../config/success_constants';
// import '../config/fcm';

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(throttle);
app.use(express.static('./storage/uploads'));
app.use(swagger);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: '/api-docs/swagger.json',
        },
    })
);

app.get('/', (req, res) => {
    return res.json({ data: SuccessConstants.HELLO_WORLD });
});

app.use(`${BASE_URL}/users`, userRouter);
app.use(`${BASE_URL}/categories`, categoryRouter);
app.use(`${BASE_URL}/products`, productRouter);

app.get('*', (req: Request, res: Response) => {
    return res.status(StatusCodes.NOT_FOUND).json({ errors: ErrorConstants.RESOURCE_NOT_FOUND });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }
    Logger.error(err, 'EXCEPTION');
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: err.message || err || String(err) || ErrorConstants.INTERNAL_SERVER_ERROR });
});
