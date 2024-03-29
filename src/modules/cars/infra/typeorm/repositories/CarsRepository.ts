import {
    getRepository
} from 'typeorm';
import {
    Repository
} from 'typeorm';
import {
    ICreateCarDTO
} from '@modules/cars/dtos/ICreateCarDTO';
import {
    ICarsRepository
} from '@modules/cars/repositories/ICarsRepository';
import {
    Car
} from '../entities/Car';
import { database } from '@shared/infra/typeorm/helpers/db-connection-helper';


class CarsRepository implements ICarsRepository {
    private repository: Repository <Car>

        constructor() {
            this.repository = database.getRepository(Car)
        }

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        specifications,
        id
    }: ICreateCarDTO): Promise < Car > {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id
        })

        await this.repository.save(car)

        return car
    }

    async findByLicensePlate(license_plate: string): Promise < Car > {
        const car = await this.repository.findOne({
            where: {
                license_plate
            }
        })

        return car!
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = this.repository
        .createQueryBuilder("c")
        .where("available = :available", { available: true })

        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand })
        }

        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id })
        }

        if (name) {
            carsQuery.andWhere("name = :name", { name })
        }

        const cars = await carsQuery.getMany()

        return cars
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne({
            where: {
                id
            }
        })

        return car!
    }

    async updateAvailable(id: string, available: boolean): Promise<Car> {
        const car = await this.repository.findOneOrFail({
            where: {
                id: id
            }
        })

        car.available = available

        await this.repository.save(car)

        return car
    }

}

export {
    CarsRepository
}