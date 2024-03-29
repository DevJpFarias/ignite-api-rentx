import dayjs from "dayjs"
import { AppError } from "@shared/errors/AppError"
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase
let dayjsDateProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Rental", () => {
    const dayAdd48Hours = dayjs().add(2, "day").toDate()
    beforeEach(() => {
      rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
      dayjsDateProvider = new DayjsDateProvider()
      carsRepositoryInMemory = new CarsRepositoryInMemory()
      createRentalUseCase = new CreateRentalUseCase(
        rentalsRepositoryInMemory,
        dayjsDateProvider,
        carsRepositoryInMemory
      )
    })

    it("should be able to create a new rental", async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Test",
        description: "Car Test",
        daily_rate: 100,
        license_plate: "test",
        fine_amount: 40,
        category_id: "1234",
        brand: "brand"
      })

      const rental = await createRentalUseCase.execute({
        user_id: "123456",
        car_id: car.id,
        expected_return_date: dayAdd48Hours
      })

      expect(rental).toHaveProperty("id")
      expect(rental).toHaveProperty("start_date")
    })

    it("should not be able to create a new rental if there is another open to the same car", async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Name Car",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category"
      }) 
      
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: car.id,
        expected_return_date: dayAdd48Hours
      })

      await expect(createRentalUseCase.execute({
          user_id: "321",
          car_id: car.id,
          expected_return_date: dayAdd48Hours
      })).rejects.toEqual(new AppError("Car is unavailable"))
    })

    it("should not be able to create a new rental if there is another open to the same user", async () => {
      const car = await carsRepositoryInMemory.create({
        name: "Name Car",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category"
      })

      const car2 = await carsRepositoryInMemory.create({
        name: "Name Car2",
        description: "Description Car2",
        daily_rate: 100,
        license_plate: "ABC-1235",
        fine_amount: 60,
        brand: "Brand2",
        category_id: "Category2"
      })

      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: car.id,
        expected_return_date: dayAdd48Hours
      })

      await expect(createRentalUseCase.execute({
        user_id: "123456",
        car_id: car2.id,
        expected_return_date: dayAdd48Hours
      })).rejects.toEqual(new AppError("There's a rental in progress for user!"))
    })

    it("should not be able to create a new rental with invalid return time", async () => {
      await expect(createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate()
      })).rejects.toEqual(new AppError("Invalid return time!"))
    })
})