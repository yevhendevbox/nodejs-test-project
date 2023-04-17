import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputsErrors } from './modules/middleware';
import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from './handlers/product';
import { createUpdate, deleteUpdate, getUpdateById, getUpdates, updateUpdate } from './handlers/update';

const router = Router();

// Product

router.get('/product', getProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id', [body('name').isString(), handleInputsErrors], updateProductById);
router.post('/product', [body('name').isString(), handleInputsErrors], createProduct);
router.delete('/product/:id', deleteProductById);

// Update

router.get('/update', getUpdates);
router.get('/update/:id', getUpdateById);

router.put('/update/:id', [
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  handleInputsErrors,
], updateUpdate);

router.post('/update', [
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  handleInputsErrors,
], createUpdate);

router.delete('/update/:id', deleteUpdate);

// Update Point

router.get('/updatepoint', () => { });
router.get('/updatepoint/:id', () => { });

router.put('/updatepoint/:id', [
  body('name').optional().isString(),
  body('description').optional().isString(),
  handleInputsErrors,
], () => { });

router.post('/updatepoint', [
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  handleInputsErrors,
], () => { });
router.delete('/updatepoint/:id', () => { });

export default router;
