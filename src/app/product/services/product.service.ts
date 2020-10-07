import { StatusCodes } from 'http-status-codes';
import { ErrorConstants } from '../../../config/error_constants';
import { AppResponse } from 'src/interface/app_response';
import { Pagination, ProductModel, Status } from '../models/product.model';
import { CategoryService } from './category.service';
import _ from 'lodash';
import { APP_URL } from '../../../config';

export class ProductService {
    /**
     * Create a new product
     * @param data any
     */
    public async createProduct(data: any): Promise<AppResponse> {
        try {
            // Check categories are valid if given
            if (data.category) {
                let category: any = await new CategoryService().getCategoryByIds(data.category);

                if (!category.success) {
                    return category;
                }
                category = category.data;

                if (data.category.length != category.length) {
                    return {
                        success: false,
                        errors: ErrorConstants.INVALID_DATA,
                        statusCode: StatusCodes.BAD_REQUEST,
                    };
                }

                data.category = category.map((data: any) => {
                    return {
                        id: data._id,
                        name: data.name,
                    };
                });
            }
            data.price = data.basePrice - (data.discount || 0);
            data.status = Status.ACTIVE;
            const product = await ProductModel.create(data);

            return {
                success: true,
                data: product,
                meta: {
                    fileUrl: APP_URL,
                },
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
     * Get the product by its id
     * @param id string
     */
    public async getProductById(id: string): Promise<AppResponse> {
        try {
            const product = await ProductModel.findOne({
                _id: id,
                status: { $ne: Status.DELETED },
            });

            if (!product) {
                return {
                    success: false,
                    errors: ErrorConstants.PRODUCT_NOT_FOUND,
                    statusCode: StatusCodes.NOT_FOUND,
                };
            }

            return {
                success: true,
                data: product,
                meta: {
                    fileUrl: APP_URL,
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

    /**
     * Update the details of the product
     * @param data any
     * @param id string
     */
    public async updateProduct(data: any, id: string): Promise<AppResponse> {
        try {
            let product: any = await this.getProductById(id);
            if (!product.success) {
                return product;
            }

            product = product.data;

            // Check categories are valid if given
            if (data.category) {
                let category: any = await new CategoryService().getCategoryByIds(data.category);

                if (!category.success) {
                    return category;
                }
                category = category.data;

                if (data.category.length != category.length) {
                    return {
                        success: false,
                        errors: ErrorConstants.INVALID_DATA,
                        statusCode: StatusCodes.BAD_REQUEST,
                    };
                }

                data.category = category.map((data: any) => {
                    return {
                        id: data._id,
                        name: data.name,
                    };
                });
            }

            data.price = data.basePrice - (data.discount || 0);
            for (const key in data) {
                product[key] = data[key];
            }

            await product.save();

            return {
                success: true,
                data: product,
                meta: {
                    fileUrl: APP_URL,
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

    /**
     * Delete the given product
     * @param id string
     */
    public async deleteProduct(id: string): Promise<AppResponse> {
        try {
            let product: any = await this.getProductById(id);
            if (!product.success) {
                return product;
            }

            product = product.data;
            product.status = Status.DELETED;

            await product.save();

            return {
                success: true,
                data: product,
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
     * Get the list of products
     * @param data any
     */
    public async listProduct(data: any): Promise<AppResponse> {
        try {
            let conditions: any = {
                status: { $ne: Status.DELETED },
            };

            if (data.search) {
                conditions.$or = [{ name: { $regex: data.search, $options: 'i' } }, { tag: { $regex: data.search, $options: 'i' } }];
            }

            if (data.idealFor) {
                conditions.idealFor = { $in: data.idealFor };
            }

            if (data.category) {
                conditions['category.id'] = { $in: data.category };
            }

            let total = await ProductModel.countDocuments(conditions);

            let product: any = ProductModel.find(conditions);

            if (!JSON.parse(data.all)) {
                if (data.skip) {
                    product.skip(Number(data.skip));
                } else {
                    product.skip(Pagination.SKIP);
                }
    
                if (data.size) {
                    product.limit(Number(data.size));
                } else {
                    product.limit(Pagination.SIZE);
                }
            }

            if (data.sort) {
                product.sort(data.sort);
            } else {
                product.sort('-createdAt');
            }

            product = await product.exec();

            return {
                success: true,
                data: product,
                meta: {
                    total: total,
                    fileUrl: APP_URL,
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

    /**
     * Upload the images of the product
     * @param file any
     * @param id string
     */
    public async uploadProductImage(files: any, id: string): Promise<AppResponse> {
        try {
            let product: any = await this.getProductById(id);
            if (!product.success) {
                return product;
            }

            product = product.data;
            const filesName = _.map(files, 'filename');

            if (filesName.length) {
                product.image.push({ $each: filesName });
                await product.save();
            }

            return {
                success: true,
                data: product,
                meta: {
                    fileUrl: APP_URL,
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

    /**
     * Delete the given images from the product
     * @param data any
     * @param id
     */
    public async deleteProductImage(data: any, id: string): Promise<AppResponse> {
        try {
            let product: any = await this.getProductById(id);
            if (!product.success) {
                return product;
            }

            product = product.data;

            product.image.pull(...data.image);
            await product.save();

            return {
                success: true,
                data: product,
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
}
