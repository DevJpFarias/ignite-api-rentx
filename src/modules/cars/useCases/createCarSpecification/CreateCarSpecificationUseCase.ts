import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
    car_id: string
    specifications_id: string[]
}

// injectable()
class CreateCarSpecificationUseCase {
    constructor (
        // @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({ car_id, specifications_id }: IRequest): Promise<void> {

        const carExists = await this.carsRepository.findById(car_id)

        if (!carExists) throw new AppError("This car does not exists!")
    }

}

export { CreateCarSpecificationUseCase }