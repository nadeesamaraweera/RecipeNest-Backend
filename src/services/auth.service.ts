import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {UserRepository} from '../repositories/user.repository';
import {User} from '../models/user.model';

export class AuthService {
    constructor(private userRepository: UserRepository) {
    }

    async registerUser(name: string, email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepository.createUser({name, email, password: hashedPassword});
    }

    async loginUser(email: string, password: string): Promise<{ user: Omit<User, 'password'>, token: string }> {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const {password: _, ...userWithoutPassword} = user;

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET!,
            {expiresIn: '1h'}
        );

        return {
            user: userWithoutPassword,
            token
        };
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.getUsers();
    }
}