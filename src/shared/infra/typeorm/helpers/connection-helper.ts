import { database } from './db-connection-helper'

export const connection = () => database.initialize().catch((error: any) => console.error(error))