import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { database } from "@shared/infra/typeorm/helpers/db-connection-helper";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";


class CarsImagesRepository implements ICarsImagesRepository {
    private repository: Repository<CarImage>

    constructor () {
        this.repository = database.getRepository(CarImage)
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name
        })

        await this.repository.save(carImage)

        return carImage
    }

}

export { CarsImagesRepository }