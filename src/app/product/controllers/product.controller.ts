import autoBind from 'auto-bind';
import { NextFunction, Request, Response } from 'express';
import { ApiOperationDelete, ApiOperationGet, ApiOperationPost, ApiOperationPut, ApiPath } from 'swagger-express-typescript';
import { ResponseHandler } from '../../../util/response_handler';
import { productCreate, productDelete, productGet, productImageDelete, productImageUpload, productList, productUpdate } from '../docs';
import { ProductService } from '../services/product.service';

@ApiPath({
    path: '/products',
    name: 'Product'
})
export class ProductController extends ResponseHandler {
    private readonly service!: ProductService;
    constructor() {
        super();
        autoBind(this);
        this.service = new ProductService();
    }

    @ApiOperationPost(productCreate)
    public async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.createProduct(req.body);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationPost(productImageUpload)
    public async uploadProductImage(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.uploadProductImage(req.files, req.params.productId);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationPut(productUpdate)
    public async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.updateProduct(req.body, req.params.productId);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationGet(productGet)
    public async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.getProductById(req.params.productId);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationGet(productList)
    public async listProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.listProduct(req.query);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationDelete(productDelete)
    public async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteProduct(req.params.productId);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationDelete(productImageDelete)
    public async deleteProductImage(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteProductImage(req.body, req.params.productId);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

}
