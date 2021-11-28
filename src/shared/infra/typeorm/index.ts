import { getConnectionOptions, createConnection, Connection } from "typeorm";

export default async(host = "localhost"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions()
    
    return createConnection(
        Object.assign(defaultOptions, {
            host,
        })
    )
}
