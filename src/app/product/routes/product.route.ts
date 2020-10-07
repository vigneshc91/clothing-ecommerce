import { Router } from 'express';
import { validate } from '../../../middleware/validate';
import { authenticate } from '../../../middleware/auth';
import { ProductController } from '../controllers/product.controller';
import { productCreateDto, productImageDeleteDto, productListDto, productUpdateDto } from '../dtos';
import { storage } from '../../../config/storage';

export const productRouter = Router();
const productController = new ProductController();
productRouter.post('/', [authenticate, validate(productCreateDto)], productController.createProduct);
productRouter.post('/:productId/image', [authenticate, storage.array('image')], productController.uploadProductImage);
productRouter.delete('/:productId/image', [authenticate, validate(productImageDeleteDto)], productController.deleteProductImage);
productRouter.put('/:productId', [authenticate, validate(productUpdateDto)], productController.updateProduct);
productRouter.get('/', validate(productListDto), productController.listProduct);
productRouter.get('/:productId', productController.getProduct);
productRouter.delete('/:productId', authenticate, productController.deleteProduct);
