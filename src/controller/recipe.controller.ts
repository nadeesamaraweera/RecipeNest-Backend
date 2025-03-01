import {Request, Response, NextFunction} from 'express';
import {RecipeService} from '../services/recipe.service';

export class RecipeController {
    constructor(private recipeService: RecipeService) {
    }

    async searchRecipes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const ingredients = req.query.ingredients as string;
            const userId = req.user?.id;

            if (!ingredients) {
                res.status(400).json({error: 'Ingredients parameter is required'});
                return;
            }

            if (!userId) {
                res.status(401).json({error: 'User not authenticated'});
                return;
            }
            console.log('ingredients:', ingredients);
            const recipes = await this.recipeService.searchRecipes(ingredients, userId);
            res.json(recipes);
        } catch (error) {
            next(error);
        }
    }

    async getSearchHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;

            if (!userId) {
                res.status(401).json({error: 'User not authenticated'});
                return;
            }

            const searchHistory = await this.recipeService.getSearchHistory(userId);
            res.json(searchHistory);
        } catch (error) {
            next(error);
        }
    }
}