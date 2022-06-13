import { DataSource } from 'typeorm'
import { PostgresDataSource } from '@shared/infra/typeorm/connections/index'
import { TestsDataSource } from '@shared/infra/typeorm/connections/tests'

interface IDatabase {
	[key: string]: DataSource
}

const databases: IDatabase = {
	test: TestsDataSource,
	prod: PostgresDataSource,
}

const environment = process.env.NODE_ENV || 'prod'

export const database = databases[environment]