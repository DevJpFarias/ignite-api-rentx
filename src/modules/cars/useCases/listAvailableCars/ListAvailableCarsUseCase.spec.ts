import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsUseCase'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Available Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "DEF-1234",
            fine_amount: 50,
            brand: "Car_brand",
            category_id: "category_id"
        })
        const cars = await listAvailableCarsUseCase.execute({})

        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car Description2",
            daily_rate: 100,
            license_plate: "DEF-1245",
            fine_amount: 50,
            brand: "Car_brand2",
            category_id: "category_id2"
        })
        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand2"
        })

        expect(cars).toEqual([car])
    })
})