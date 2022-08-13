

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from 'tsyringe';

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
  }

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_date
    }: IRequest): Promise<Rental> {
      const minimumHour = 24

      const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

      if(carUnavailable) throw new AppError("Car is unavailable")

      const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

      if(rentalOpenToUser) throw new AppError("There's a rental in progress for user!")

      const dateNow = this.dateProvider.dateNow()

      const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)

      if(compare < minimumHour) throw new AppError("Invalid return time!")

      const car = await this.carsRepository.findById(car_id)

      if(!car) throw new AppError('Car not found!')

      const rental = await this.rentalsRepository.create({
        user_id,
        car_id,
        expected_return_date,
        start_date: dateNow,
      })

      await this.carsRepository.updateAvailable(car_id, false)

      return rental
    }
}

export { CreateRentalUseCase }