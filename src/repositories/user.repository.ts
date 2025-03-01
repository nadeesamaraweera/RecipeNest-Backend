import prisma from '../config/prisma';
import {User} from '../models/user.model';

export class UserRepository {
    async createUser(userData: { name: string; email: string; password: string }): Promise<User> {
        return prisma.user.create({data: userData});
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({where: {email}});
    }

    async getUsers(): Promise<User[]> {
        return prisma.user.findMany();
    }

}