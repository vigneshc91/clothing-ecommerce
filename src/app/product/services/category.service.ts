import { StatusCodes } from 'http-status-codes';
import { ErrorConstants } from '../../../config/error_constants';
import { AppResponse } from 'src/interface/app_response';
import { CategoryModel, Pagination, Status } from '../models/category.model';

export class CategoryService {
    /**
     * Create a new category
     * @param data any
     */
    public async createCategory(data: any): Promise<AppResponse> {
        try {
            const category = await CategoryModel.create(data);

            return {
                success: true,
                data: category,
                statusCode: StatusCodes.CREATED,
            };
        } catch (error) {
            return {
                success: false,
                errors: error,
                exception: error,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * Get the category by its id
     * @param id string
     */
    public async getCategoryById(id: string): Promise<AppResponse> {
        try {
            const category = await CategoryModel.findOne({
                _id: id,
                status: { $ne: Status.DELETED },
            });

            if (!category) {
                return {
                    success: false,
                    errors: ErrorConstants.CATEGORY_NOT_FOUND,
                    statusCode: StatusCodes.NOT_FOUND,
                };
            }

            return {
                success: true,
                data: category,
                statusCode: StatusCodes.OK,
            };
        } catch (error) {
            return {
                success: false,
                errors: error,
                exception: error,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * Get category by array of id
     * @param id string[]
     */
    public async getCategoryByIds(id: string[]): Promise<AppResponse> {
        try {
            const category = await CategoryModel.find({
                _id: { $in: id },
                status: { $ne: Status.DELETED },
            });

            return {
                success: true,
                data: category,
                statusCode: StatusCodes.OK,
            };
        } catch (error) {
            return {
                success: false,
                errors: error,
                exception: error,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * Update the details of the category
     * @param data any
     * @param id string
     */
    public async updateCategory(data: any, id: string): Promise<AppResponse> {
        try {
            let category: any = await this.getCategoryById(id);
            if (!category.success) {
                return category;
            }
            category = category.data;

            for (const key in data) {
                category[key] = data[key];
            }

            await category.save();

            return {
                success: true,
                data: category,
                statusCode: StatusCodes.OK,
            };
        } catch (error) {
            return {
                success: false,
                errors: error,
                exception: error,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * Delete the category by its id
     * @param id string
     */
    public async deleteCategory(id: string): Promise<AppResponse> {
        try {
            let category: any = await this.getCategoryById(id);
            if (!category.success) {
                return category;
            }
            category = category.data;

            category.status = Status.DELETED;
            await category.save();

            return {
                success: true,
                data: category,
                statusCode: StatusCodes.NO_CONTENT,
            };
        } catch (error) {
            return {
                success: false,
                errors: error,
                exception: error,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            };
        }
    }

    /**
     * Get the list of categories
     * @param data any
     */
    public async listCategory(data: any): Promise<AppResponse> {
        try {
            let conditions: any = {
                status: { $ne: Status.DELETED },
            };

            if (data.search) {
                conditions.name = { $regex: data.search, $options: 'i' };
            }

            let total = await CategoryModel.countDocuments(conditions);

            let category: any = CategoryModel.find(conditions);

            if (!JSON.parse(data.all)) {
                if (data.skip) {
                    category.skip(Number(data.skip));
                } else {
                    category.skip(Pagination.SKIP);
                }
    
                if (data.size) {
                    category.limit(Number(data.size));
                } else {
                    category.limit(Pagination.SIZE);
                }
            }

            if (data.sort) {
                category.sort(data.sort);
            } else {
                category.sort('-createdAt');
            }

            category = await category.exec();

            return {
                success: true,
                data: category,
                meta: {
                    total: total,
                },
                statusCode: StatusCodes.OK,
            };
        } catch (error) {
            return {
                success: false,
                errors: error,
                exception: error,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            };
        }
    }
}
