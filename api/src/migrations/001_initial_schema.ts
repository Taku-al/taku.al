import db from '../config/db';
import { sql } from 'kysely';

export default async function () {
    console.log('🚀 Starting initial schema migration...');

    // Enable pgcrypto extension for UUID generation
    await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`.execute(db);
    console.log('✅ Enabled pgcrypto extension');

    // Create users table
    await db.schema
        .createTable('users')
        .ifNotExists()
        .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('email', 'text', (col) => col.notNull().unique())
        .addColumn('password', 'text', (col) => col.notNull())
        .addColumn('role', 'text', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .execute();
    console.log('✅ Created users table');

    // Create services table
    await db.schema
        .createTable('services')
        .ifNotExists()
        .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn('title', 'text', (col) => col.notNull())
        .addColumn('description', 'text', (col) => col.notNull())
        .addColumn('provider_id', 'uuid', (col) => col.notNull().references('users.id').onDelete('cascade'))
        .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .execute();
    console.log('✅ Created services table');

    // Create slots table
    await db.schema
        .createTable('slots')
        .ifNotExists()
        .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn('date_time', 'timestamp', (col) => col.notNull())
        .addColumn('is_booked', 'boolean', (col) => col.notNull().defaultTo(false))
        .addColumn('service_id', 'uuid', (col) => col.notNull().references('services.id').onDelete('cascade'))
        .execute();
    console.log('✅ Created slots table');

    // Create appointments table
    await db.schema
        .createTable('appointments')
        .ifNotExists()
        .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn('service_id', 'uuid', (col) => col.notNull().references('services.id').onDelete('cascade'))
        .addColumn('customer_id', 'uuid', (col) => col.notNull().references('users.id').onDelete('cascade'))
        .addColumn('provider_id', 'uuid', (col) => col.notNull().references('users.id').onDelete('cascade'))
        .addColumn('date_time', 'timestamp', (col) => col.notNull())
        .addColumn('status', 'text', (col) => col.notNull().defaultTo('Booked'))
        .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
        .execute();
    console.log('✅ Created appointments table');

    console.log('🎉 Initial schema migration completed successfully!');
} 