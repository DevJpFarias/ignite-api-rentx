import {
    ICreateCarDTO
} from '@modules/cars/dtos/CreateCarDTO';
import {
    Car
} from '@modules/cars/infra/typeorm/entities/Car';
import {
    ICarsRepository
} from '@modules/cars/repositories/ICarsRepository';


class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = []
    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name
    }: ICreateCarDTO): Promise <void> {
        const car = new Car()

        Object.assign(car, {
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name
        })
        
        this.cars.push(car)
    }
    async findByLicensePlate(licence_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === licence_plate)!
    }
}

export {
    CarsRepositoryInMemory
}