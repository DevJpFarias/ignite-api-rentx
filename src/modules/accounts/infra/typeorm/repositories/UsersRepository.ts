import { Repository, getRepository } from 'typeorm';
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO.ts";
import { User } from '@modules/accounts/infra/typeorm/entities/User.ts';
import { IUsersRepository } from "@modules/accounts/repositories/UserRepository.ts";


class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor () {
        this.repository = getRepository(User)
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id)
        return user!;
    }

    async create({ name, email, driver_license, password, id, avatar }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id
        });

        await this.repository.save(user);
    }
    
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email})
        return user!;
    }
}

export { UsersRepository };