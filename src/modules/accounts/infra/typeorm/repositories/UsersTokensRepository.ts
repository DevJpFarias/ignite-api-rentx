import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { database } from "@shared/infra/typeorm/helpers/db-connection-helper";
import { Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = database.getRepository(UserTokens)
  }

  async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token
    })

    await this.repository.save(userToken)

    return userToken
  }
}

export { UsersTokensRepository }