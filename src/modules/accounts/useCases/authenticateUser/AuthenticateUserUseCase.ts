import { AppError } from '@errors/AppError'
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor (
        @inject("UsersRepository")
    private usersRepository: IUsersRepository) {}

    async execute ({email, password}: IRequest): Promise<IResponse> {
        //Usuário existe
        const user = await this.usersRepository.findByEmail(email)

        if (!user) throw new AppError("Email or password incorrect!")

        //Senha está correta
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) throw new AppError("Email or password incorrect!")

        //Gerar jsonwebtoken
        const token = sign({}, "23e1f7d6bf1512e75bcaf5ff9ba33425", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }