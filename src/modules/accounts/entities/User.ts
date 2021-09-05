import { Entity } from 'typeorm';
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {

    id: string;

    name: string;

    username: string;

    email: string;

    password: string;

    driver_license: string;

    isAdmin: boolean;

    avatar: string;

    create_at: Date;

    constructor () {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { User };