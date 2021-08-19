import { ISpecificationsRepository } from "../../Repositories/ISpecificationRepository";


interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) {}
    execute({ description, name }: IRequest) {
        const specificationAlreadyExists = this.specificationsRepository.findByName(name);

        if(specificationAlreadyExists) {
            throw new Error("Specifications Already Exists!")
        }

        this.specificationsRepository.create({
            name,
            description,
        })
    }
}

export { CreateSpecificationUseCase };