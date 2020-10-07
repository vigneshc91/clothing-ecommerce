import { Router } from 'express';
import { authenticate } from '../../../middleware/auth';
import { validate } from '../../../middleware/validate';
import { CategoryController } from '../controllers/category.controller';
import { categoryCreateDto, categoryListDto, categoryUpdateDto } from '../dtos';

export const categoryRouter = Router();
const cateogryController = new CategoryController();

categoryRouter.post('/', [authenticate, validate(categoryCreateDto)], cateogryController.createCategory);
categoryRouter.put('/:categoryId', [authenticate, validate(categoryUpdateDto)], cateogryController.updateCategory);
categoryRouter.delete('/:categoryId', [authenticate], cateogryController.deleteCategory);
categoryRouter.get('/:categoryId', cateogryController.getCategory);
categoryRouter.get('/', [validate(categoryListDto)], cateogryController.listCategory);
