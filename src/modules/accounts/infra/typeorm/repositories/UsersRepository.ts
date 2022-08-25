import { Repository } from 'typeorm';
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { database } from '@shared/infra/typeorm/helpers/db-connection-helper';


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor () {
    this.repository = database.getRepository(User)
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
    const user = await this.repository.findOne({
      where: {
        email
      }
    })
    return user!;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id
      }
    })
    return user!;
  }
}

export { UsersRepository };