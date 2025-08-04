import { Router } from 'express';
import { createDeclaration, getAllDeclarations } from '../controllers/declarationController';

const router = Router();

router.get('/', getAllDeclarations);
router.post('/', createDeclaration);

export default router; 