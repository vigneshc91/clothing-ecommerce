import autoBind from 'auto-bind';
import { NextFunction, Request, Response } from 'express';
import { ResponseHandler } from '../../../util/response_handler';
import { ApiOperationDelete, ApiOperationGet, ApiOperationPost, ApiOperationPut, ApiPath } from 'swagger-express-typescript';
import { CategoryService } from '../services/category.service';
import { categoryCreate, categoryDelete, categoryGet, categoryList, categoryUpdate } from '../docs';

@ApiPath({
    path: '/categories',
    name: 'Category'
})
export class CategoryController extends ResponseHandler {
    private service: CategoryService;

    constructor() {
        super();
        autoBind(this);
        this.service = new CategoryService();
    }

    @ApiOperationPost(categoryCreate)
    public async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.createCategory(req.body);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationPut(categoryUpdate)
    public async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.updateCategory(req.body, req.params.categoryId);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationGet(categoryList)
    public async listCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.listCategory(req.query);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationGet(categoryGet)
    public async getCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.getCategoryById(req.params.categoryId);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }

    @ApiOperationDelete(categoryDelete)
    public async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.deleteCategory(req.params.categoryId);
            return this.handle(res, data);
        } catch (error) {
            return next(error);
        }
    }
}
