import { Kysely, PostgresDialect, Generated } from 'kysely';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from "node:path";


dotenv.config({ path: path.resolve(__dirname, '../../.env') });
console.log('Connecting to database...');
console.log(process.env.DATABASE_URL);
// Define your DB schema (expand this per table)
// config/db.ts (continued)

export interface DB {
    users: {
        id: Generated<string>;
        name: string;
        email: string;
        password: string;
        role: 'customer' | 'provider' | 'admin';
        created_at: Generated<Date>;
        updated_at: Generated<Date>;
    };
    services: {
        id: Generated<string>;
        title: string;
        description: string;
        provider_id: string;
        created_at: Generated<Date>;
        updated_at: Generated<Date>;
    };
    slots: {
        id: Generated<string>;
        date_time: Date;
        is_booked: boolean;
        service_id: string;
    };
    appointments: {
        id: Generated<string>;
        service_id: string;
        customer_id: string;
        provider_id: string;
        date_time: Date;
        status: 'Booked' | 'Completed' | 'Canceled';
        created_at: Generated<Date>;
        updated_at: Generated<Date>;
    };
}



const db = new Kysely<DB>({
    dialect: new PostgresDialect({
        pool: new Pool({
            connectionString: process.env.DATABASE_URL,
        }),
    }),
});

export default db;
