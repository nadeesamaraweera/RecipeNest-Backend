export interface Recipe {
    id: number;
    title: string;
    image: string;
    missedIngredients: Ingredient[];
    usedIngredients: Ingredient[];
    likes: number;
}

export interface Ingredient {
    id: number;
    name: string;
    amount: number;
    unit: string;
}

export interface SpoonacularResponse {
    results: Recipe[];
}