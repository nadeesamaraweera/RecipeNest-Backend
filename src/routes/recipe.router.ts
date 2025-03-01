import {Router} from 'express';
import {authenticate} from '../middleware/auth.middleware';
import {RecipeController} from '../controller/recipe.controller';
import {RecipeService} from '../services/recipe.service';
import {SearchHistoryRepository} from '../repositories/search-history.repository';

const router = Router();
const recipeService = new RecipeService(
    new SearchHistoryRepository(),
    process.env.SPOONACULAR_API_KEY!
);
const recipeController = new RecipeController(recipeService);

router.get('/search', authenticate, recipeController.searchRecipes.bind(recipeController));
router.get('/history', authenticate, recipeController.getSearchHistory.bind(recipeController));

export default router;