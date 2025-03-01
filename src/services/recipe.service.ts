import axios from 'axios';
import {Recipe, Ingredient} from '../models/recipe.model';
import {SearchHistoryRepository} from '../repositories/search-history.repository';
import {SearchHistory} from '@prisma/client';

export class RecipeService {
    constructor(
        private searchHistoryRepo: SearchHistoryRepository,
        private apiKey: string
    ) {
    }

    async searchRecipes(ingredients: string, userId: number): Promise<Recipe[]> {
        try {
            const response = await axios.get(
                'https://api.spoonacular.com/recipes/findByIngredients',
                {
                    params: {
                        ingredients,
                        apiKey: this.apiKey,
                        number: 10
                    }
                }
            );

            await this.searchHistoryRepo.createSearchHistory(ingredients, userId);

            if (!response.data) {
                console.error('Invalid response structure:', response.data);
                throw new Error('Invalid response from Spoonacular API');
            }

            return response.data.map((recipe: any) => ({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                missedIngredients: recipe.missedIngredients.map((ingredient: any) => ({
                    id: ingredient.id,
                    name: ingredient.name,
                    amount: ingredient.amount,
                    unit: ingredient.unit
                })),
                usedIngredients: recipe.usedIngredients.map((ingredient: any) => ({
                    id: ingredient.id,
                    name: ingredient.name,
                    amount: ingredient.amount,
                    unit: ingredient.unit
                })),
                likes: recipe.likes
            }));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Spoonacular API error:', error.response.data);
            } else if (error instanceof Error) {
                console.error('Failed to fetch recipes from Spoonacular API:', error.message);
            } else {
                console.error('Failed to fetch recipes from Spoonacular API:', error);
            }
            throw new Error('Failed to fetch recipes from Spoonacular API');
        }
    }

    async getSearchHistory(userId: number): Promise<SearchHistory[]> {
        return this.searchHistoryRepo.getSearchHistoryByUserId(userId);
    }
}