import { getConnectionOptions, createConnection, Connection } from "typeorm";

export default async(host = "192.168.99.100"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions()
    
    return createConnection(
        Object.assign(defaultOptions, {
            host,
        })
    )
}
