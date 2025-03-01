import prisma from '../config/prisma';
import {SearchHistory} from '@prisma/client';

export class SearchHistoryRepository {
    async createSearchHistory(query: string, userId: number): Promise<SearchHistory> {
        return prisma.searchHistory.create({
            data: {
                query,
                userId
            }
        });
    }

    async getSearchHistoryByUserId(userId: number): Promise<SearchHistory[]> {
        return prisma.searchHistory.findMany({
            where: {userId}
        });
    }
}