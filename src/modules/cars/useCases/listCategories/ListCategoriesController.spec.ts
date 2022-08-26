import request from 'supertest'
import { app } from '@shared/infra/http/app'
import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import { DataSource } from 'typeorm'
import { TestsDataSource } from '@shared/infra/typeorm/connections/tests'
import { Category } from '@modules/cars/infra/typeorm/entities/Category'

let connection: DataSource

describe('List Category Controller', () => {
  beforeAll(async () => {
    connection = await TestsDataSource.initialize()
  })

	beforeEach(async () => {
		const id = uuidV4()
    const password = await hash("admin", 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license, avatar) values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX', 'null')
    `)
	})

	afterAll(async () => {
    await connection.createQueryBuilder().delete().from(Category).execute()
		//await connection.destroy()
	})

  it('Should be able to list all categories', async () => {
    const responseToken = await request(app).post("/sessions")
        .send({
          email: "admin@rentx.com.br",
          password: "admin",
        });
        
      const { refresh_token } = responseToken.body;
      
      //await connection.createQueryBuilder().delete().from(Category).execute()
      await request(app).post("/categories").send({
        name: "Category Supertest",
        description: "Category Supertest"
      }).set({
        Authorization: `Bearer ${refresh_token}`
      })

      const response = await request(app).get("/categories")

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1)
  })
})