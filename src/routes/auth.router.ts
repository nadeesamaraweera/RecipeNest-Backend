import {Router} from 'express';
import {UserRepository} from '../repositories/user.repository';
import {AuthService} from '../services/auth.service';
import {AuthController} from '../controller/auth.controller';
import {authenticate} from '../middleware/auth.middleware';

const router = Router();
const authController = new AuthController(new AuthService(new UserRepository()));

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.get('/users', authenticate, authController.getUsers.bind(authController));

export default router;