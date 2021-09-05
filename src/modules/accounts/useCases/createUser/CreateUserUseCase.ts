import { inject } from 'tsyringe';
import { ICreateUserDTO } from "../../../accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";



class CreateUserUseCase {
    constructor (
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    execute({ name, username, email, password, driver_license }: ICreateUserDTO) {}
}

export { CreateUserUseCase }