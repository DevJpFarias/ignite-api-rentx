import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";


interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository) {}
    
    async execute({ description, name }: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);
        
        if(specificationAlreadyExists) {
            throw new AppError("Specifications Already Exists!")
        }

        await this.specificationsRepository.create({
            name,
            description,
        })
    }
}

export { CreateSpecificationUseCase };