import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'
import { database } from '../helpers/db-connection-helper'

async function create() {
	const connection = await database.initialize()

    const id = uuidV4()
    const password = await hash("admin", 8)

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license, avatar)
            values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX', 'null')
        `
    )

    connection.close;
}

create().then(() => console.log("User admin created!"))
