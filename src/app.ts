import express from 'express';
import authRouter from './routes/auth.router';
import recipeRouter from './routes/recipe.router';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/recipes', recipeRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    res.status(500).json({error: 'Internal server error'});
});

export default app;